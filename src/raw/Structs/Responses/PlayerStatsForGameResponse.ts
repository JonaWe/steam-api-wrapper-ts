import PlayerGameAchievement from '../PlayerGameAchievement';
import PlayerGameStat from '../PlayerGameStat';

export default interface PlayerStatsForGameResponse {
  playerstats: {
    steamID: string;
    gameName: string;
    stats: PlayerGameStat[];
    achievements: PlayerGameAchievement[];
  };
}
