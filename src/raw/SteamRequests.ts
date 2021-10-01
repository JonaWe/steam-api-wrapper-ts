import axios from 'axios';
import UserSummaryResponse from './Structs/Responses/UserSummaryResponse';

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

    const result = await axios.get(
      `${this.baseUrl}${path}${this.stringifyGetParams(params)}`
    );
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

  async getPlayerSummaries(steam64ids: string | string[]) {
    if (typeof steam64ids !== 'string') {
      steam64ids = steam64ids.join(',');
    }

    const result = (await this.get('/ISteamUser/GetPlayerSummaries/v0002', {
      steamids: steam64ids,
    })) as UserSummaryResponse;

    return result.response.players;
  }
}
