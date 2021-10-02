import PlayerAchievement from '../PlayerAchievement';

export default interface PlayerAchievementsResponse {
  playerstats: {
    steamid: string;
    gameName: string;
    achievements: PlayerAchievement[];
    success: boolean;
  };
}
