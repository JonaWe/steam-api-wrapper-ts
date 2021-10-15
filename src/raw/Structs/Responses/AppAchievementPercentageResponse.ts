import AppAchievementPercentage from '../AppAchievementPercentage';

export default interface AppAchievementPercentageResponse {
  achievementpercentages: {
    achievements: AppAchievementPercentage[];
  };
}
