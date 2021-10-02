import axios from 'axios';
import UserLevelResponse from './Structs/Responses/UserLevelResponse';
import UserOwnedGamesResponse from './Structs/Responses/UserOwnedGamesResponse';
import UserSummaryResponse from './Structs/Responses/UserSummaryResponse';
import UserSummary from './Structs/UserSummary';

const BASE_URL = 'https://api.steampowered.com';

export class SteamRequests {
  token: string;
  baseUrl: string;

  constructor(token: string, baseUrl: string = BASE_URL) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async get(path: string, params: any = {}) {
    // adds the key to the provided parameters
    params.key = this.token;

    const req_URL = `${this.baseUrl}${path}${this.stringifyGetParams(params)}`;

    const result = await axios.get(req_URL);
    return result.data;
  }

  private stringifyGetParams(params: any) {
    return Object.keys(params).reduce(
      (prev, current) =>
        `${prev}${prev === '?' ? '' : '&'}${current}=${String(
          params[current]
        )}`,
      '?'
    );
  }

  private chunkArray<Type>(array: Type[], chunkSize: number) {
    var result = [];
    for (var i = 0; i < array.length; i += chunkSize)
      result.push(array.slice(i, i + chunkSize));
    return result;
  }

  async getPlayerSummaries(steam64ids: string | string[]) {
    if (typeof steam64ids === 'string') {
      steam64ids = [steam64ids];
    }

    const chunkedSteamIds = this.chunkArray(steam64ids, 100);

    const promises = chunkedSteamIds.map(
      list =>
        this.get('/ISteamUser/GetPlayerSummaries/v0002', {
          steamids: list.join(','),
        }) as Promise<UserSummaryResponse>
    );

    const responses = await Promise.all(promises);

    return responses.reduce((prev: UserSummary[], current) => {
      return prev.concat(current.response.players);
    }, []);
  }

  async getPlayerOwnedGames(
    steamid: string,
    includeAppInfo = false,
    includePlayedFreeGames = true
  ) {
    const response = (await this.get('/IPlayerService/GetOwnedGames/v1', {
      steamid,
      include_appinfo: Number(includeAppInfo),
      include_played_free_games: Number(includePlayedFreeGames),
    })) as UserOwnedGamesResponse;

    return {
      count: response.response.game_count || 0,
      games: response.response.games || [],
    };
  }

  async getPlayerRecentGames(
    steamid: string,
    includeAppInfo = false,
    includePlayedFreeGames = false
  ) {
    const response = (await this.get(
      '/IPlayerService/GetRecentlyPlayedGames/v1',
      {
        steamid,
        include_appinfo: Number(includeAppInfo),
        include_played_free_games: Number(includePlayedFreeGames),
      }
    )) as UserOwnedGamesResponse;

    return response.response;
  }

  async getPlayerSteamLevel(steamid: string) {
    const response = (await this.get('/IPlayerService/GetSteamLevel/v1', {
      steamid,
    })) as UserLevelResponse;
    return response.response.player_level;
  }
}
