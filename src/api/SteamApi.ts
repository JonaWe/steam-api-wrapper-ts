import { Fetcher } from '..';
import { User } from '../objects/User';

export class SteamApi {
  private fetcher: Fetcher;

  constructor(apiKeyOrFetcher: Fetcher | string) {
    if (typeof apiKeyOrFetcher === 'string') {
      this.fetcher = new Fetcher(apiKeyOrFetcher);
    } else {
      this.fetcher = apiKeyOrFetcher;
    }
  }

  public async getUser(steamid: string) {
    const [summary] = await this.fetcher.getPlayerSummaries(steamid);
    return new User(this.fetcher, summary);
  }

  public getFetcher() {
    return this.fetcher;
  }
}
