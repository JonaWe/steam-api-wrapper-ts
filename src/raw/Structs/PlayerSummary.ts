export default interface PlayerSummary {
  steamid: string;
  communityvisibilitystate: number;
  commentpermission?: number;
  personastate: number;
  personaname: string;
  profileurl: string;
  profilestate?: number;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  primaryclanid?: string;
  timecreated?: number;
  personastateflags?: number;
  loccountrycode?: string;
}
