import axios from 'axios';
import PlayerFriendListResponse from './Structs/Responses/PlayerFriendListResponse';
import PlayerLevelResponse from './Structs/Responses/PlayerLevelResponse';
import PlayerOwnedGamesResponse from './Structs/Responses/PlayerOwnedGamesResponse';
import PlayerSummaryResponse from './Structs/Responses/PlayerSummaryResponse';
import PlayerSummary from './Structs/PlayerSummary';
import ResolveVanityURL from './Structs/Responses/ResolveVanityURL';
import PlayerBanResponse from './Structs/Responses/PlayerBanResponse';
import PlayerBan from './Structs/PlayerBan';
import PlayerGroupListResponse from './Structs/Responses/PlayerGroupListResponse';
import AppListResponse from './Structs/Responses/AppListResponse';
import NumberOfCurrentPlayersResponse from './Structs/Responses/NumberOfCurrentPlayersResponse';
import PlayerAchievementsResponse from './Structs/Responses/PlayerAchievementsResponse';
import SchemaForGameResponse from './Structs/Responses/SchemaForGameResponse';
import PlayerBadgesResponse from './Structs/Responses/PlayerBadgesResponse';

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

  async resolveVanityURL(vanityurl: string, url_type: number = 1) {
    // url_type: 1 individual profile; 2 group; 3 official game group
    const response = (await this.get('/ISteamUser/ResolveVanityURL/v0001', {
      vanityurl,
      url_type,
    })) as ResolveVanityURL;
    return response.response.success === 1 ? response.response.steamid! : null;
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
        }) as Promise<PlayerSummaryResponse>
    );

    const responses = await Promise.all(promises);

    return responses.reduce((prev: PlayerSummary[], current) => {
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
    })) as PlayerOwnedGamesResponse;

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
    )) as PlayerOwnedGamesResponse;

    return response.response;
  }

  async getPlayerSteamLevel(steamid: string) {
    const response = (await this.get('/IPlayerService/GetSteamLevel/v1', {
      steamid,
    })) as PlayerLevelResponse;
    return response.response.player_level;
  }

  async getPlayerFriendList(steamid: string) {
    // TODO handling private friend lists
    const response = (await this.get('/ISteamUser/GetFriendList/v1', {
      steamid,
    })) as PlayerFriendListResponse;
    return response.friendslist.friends;
  }

  async getPlayerBan(steamid: string | string[]) {
    if (typeof steamid === 'string') {
      steamid = [steamid];
    }

    const chunkedSteamIds = this.chunkArray(steamid, 100);

    const promises = chunkedSteamIds.map(
      list =>
        this.get('/ISteamUser/GetPlayerBans/v1', {
          steamids: list.join(','),
        }) as Promise<PlayerBanResponse>
    );

    const responses = await Promise.all(promises);

    return responses.reduce((prev: PlayerBan[], current) => {
      return prev.concat(current.players);
    }, []);
  }

  async getPlayerGroupList(steamid: string) {
    const response = (await this.get('/ISteamUser/GetUserGroupList/v1', {
      steamid,
    })) as PlayerGroupListResponse;

    return response.response.success ? response.response.groups : [];
  }

  async getPlayerAchievements(steamid: string, appid: number) {
    const response = (await this.get(
      '/ISteamUserStats/GetPlayerAchievements/v1',
      {
        steamid,
        appid,
      }
    )) as PlayerAchievementsResponse;

    return response.playerstats.success
      ? response.playerstats.achievements
      : null;
  }

  async getPlayerBadges(steamid: string) {
    const response = (await this.get('/IPlayerService/GetBadges/v1', {
      steamid,
    })) as PlayerBadgesResponse;
    return response.response;
  }

  async getSchemaForGame(appid: number) {
    // TODO add language option
    const response = (await this.get('/ISteamUserStats/GetSchemaForGame/v2', {
      appid,
    })) as SchemaForGameResponse;
    return {
      stats: response.game.availableGameStats.stats,
      achievements: response.game.availableGameStats.achievements,
      name: response.game.gameName,
      version: response.game.gameVersion,
    };
  }

  async getAppList() {
    const response = (await this.get(
      '/ISteamApps/GetAppList/v2'
    )) as AppListResponse;

    return response.applist.apps;
  }

  async getNumberOfCurrentPlayers(appid: number) {
    // TODO throws error when appid is not available
    const response = (await this.get(
      '/ISteamUserStats/GetNumberOfCurrentPlayers/v1',
      { appid }
    )) as NumberOfCurrentPlayersResponse;

    return response.response.result === 1
      ? response.response.player_count!
      : null;
  }
}
