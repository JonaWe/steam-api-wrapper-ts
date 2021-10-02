import PlayerAchievement from '../PlayerAchievement';

export default interface GetPlayerAchievementsResponse {
  playerstats: {
    steamid: string;
    gameName: string;
    achievements: PlayerAchievement[];
    success: boolean;
  };
}
