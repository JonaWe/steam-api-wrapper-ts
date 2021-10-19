import axios from 'axios';
import { Region } from './Types';
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
import PlayerStatsForGameResponse from './Structs/Responses/PlayerStatsForGameResponse';
import AppDetails from './Structs/AppDetails';
import AppNewsResponse from './Structs/Responses/AppNewsResponse';
import AppAchievementPercentageResponse from './Structs/Responses/AppAchievementPercentageResponse';

const BASE_URL = 'https://api.steampowered.com';
const STORE_URL = 'https://store.steampowered.com/api';

interface GetOptions {
  baseUrl?: string;
  noKey?: boolean;
}
export class Fetcher {
  constructor(
    private token: string,
    private baseUrl: string = BASE_URL,
    private storeUrl: string = STORE_URL
  ) {}

  async get(
    path: string,
    params: any = {},
    { baseUrl = this.baseUrl, noKey = false }: GetOptions = {}
  ) {
    // adds the key to the provided parameters if not specified different
    if (!noKey) params.key = this.token;

    const req_URL = `${baseUrl}${path}${this.stringifyGetParams(params)}`;

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

  public async resolveVanityURL(vanityurl: string, url_type: number = 1) {
    // url_type: 1 individual profile; 2 group; 3 official game group
    const response = (await this.get('/ISteamUser/ResolveVanityURL/v0001', {
      vanityurl,
      url_type,
    })) as ResolveVanityURL;
    return response.response.success === 1 ? response.response.steamid! : null;
  }

  public async getPlayerSummaries(steam64ids: string | string[]) {
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

  public async getPlayerOwnedGames(
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

  public async getPlayerRecentGames(
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

  public async getPlayerSteamLevel(steamid: string) {
    const response = (await this.get('/IPlayerService/GetSteamLevel/v1', {
      steamid,
    })) as PlayerLevelResponse;
    return response.response.player_level;
  }

  public async getPlayerFriendList(steamid: string) {
    // TODO handling private friend lists
    const response = (await this.get('/ISteamUser/GetFriendList/v1', {
      steamid,
    })) as PlayerFriendListResponse;
    return response.friendslist.friends;
  }

  public async getPlayerBan(steamid: string | string[]) {
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

  public async getPlayerGroupList(steamid: string) {
    const response = (await this.get('/ISteamUser/GetUserGroupList/v1', {
      steamid,
    })) as PlayerGroupListResponse;

    return response.response.success ? response.response.groups : [];
  }

  public async getPlayerAchievements(steamid: string, appid: number) {
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

  public async getPlayerBadges(steamid: string) {
    const response = (await this.get('/IPlayerService/GetBadges/v1', {
      steamid,
    })) as PlayerBadgesResponse;
    return response.response;
  }

  public async getPlayerStatsForGame(steamid: string, appid: number) {
    const response = (await this.get(
      '/ISteamUserStats/GetUserStatsForGame/v2',
      {
        steamid,
        appid,
      }
    )) as PlayerStatsForGameResponse;

    return response.playerstats;
  }

  public async getSchemaForGame(appid: number) {
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

  /**
   * Get a list with all available appids and their corresponding names.
   * @returns List with all appids and their names
   */
  public async getAppList() {
    const response = (await this.get(
      '/ISteamApps/GetAppList/v2',
      {},
      { noKey: true }
    )) as AppListResponse;

    return response.applist.apps;
  }

  /**
   * Get numerous details about an appid.
   * @param appids App ID
   * @param region Region to determin language for textoutput
   * @returns Numerous details about the app
   */
  public async getAppDetails(appids: number, region: Region = 'us') {
    const response = ((await this.get(
      '/appdetails',
      { appids, cc: region },
      { baseUrl: this.storeUrl, noKey: true }
    )) as any)[appids];

    if (response.success) {
      return response.data as AppDetails;
    } else
      return Promise.reject(new TypeError('The provided AppId is invalid!'));
  }

  /**
   * Get the list with news items for an appid.
   * @param appid App ID
   * @returns List with news items for the provided appid
   */
  public async getAppNews(appid: number) {
    const response = (await this.get(
      '/ISteamNews/GetNewsForApp/v2',
      { appid },
      { noKey: true }
    )) as AppNewsResponse;
    return response.appnews.newsitems;
  }

  /**
   * Get a list with all achievements for an appid and the corresponding
   * global completion rate.
   * @param appid App ID
   * @returns List with achievements and the global completion rate
   */
  public async getAppAchievementPercentage(appid: number) {
    const response = (await this.get(
      '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2',
      { gameid: appid },
      { noKey: true }
    )) as AppAchievementPercentageResponse;

    return response.achievementpercentages.achievements;
  }

  /**
   * Get the total number of current players for an appid.
   * @param appid App ID
   * @returns Number of current players
   */
  public async getNumberOfCurrentPlayers(appid: number) {
    // TODO throws error when appid is not available
    const response = (await this.get(
      '/ISteamUserStats/GetNumberOfCurrentPlayers/v1',
      { appid },
      { noKey: true }
    )) as NumberOfCurrentPlayersResponse;

    return response.response.result === 1
      ? response.response.player_count!
      : null;
  }
}
