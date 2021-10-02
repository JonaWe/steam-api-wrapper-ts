import Achievement from '../Achievement';

export default interface GetPlayerAchievementsResponse {
  playerstats: {
    steamid: string;
    gameName: string;
    achievements: Achievement[];
    success: boolean;
  };
}
