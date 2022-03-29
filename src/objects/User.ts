import { Fetcher } from '..';
import PlayerSummary from '../raw/Structs/PlayerSummary';
import { ProfileStatus } from './ProfileStatus';

export class User {
  readonly steamid: string;
  readonly name: string;
  readonly status: ProfileStatus;
  readonly createdAt?: Date;
  readonly __raw: PlayerSummary;

  constructor(private fetcher: Fetcher, summary: PlayerSummary) {
    console.log(summary);
    this.steamid = summary.steamid;
    this.name = summary.personaname;
    this.createdAt = summary.timecreated
      ? new Date(summary.timecreated)
      : undefined;
    this.status = summary.personastate;
    this.__raw = summary;
  }

  public async getFriends() {
    return this.fetcher.getPlayerFriendList(this.steamid);
  }
}
