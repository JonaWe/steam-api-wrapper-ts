import GameAchievement from '../GameAchievement';
import GameStats from '../GameStats';

export default interface SchemaForGameResponse {
  game: {
    gameName: string;
    gameVersion: string;
    availableGameStats: {
      stats: GameStats[];
      achievements: GameAchievement[];
    };
  };
}
