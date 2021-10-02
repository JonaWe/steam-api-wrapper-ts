import PlayerSummary from '../PlayerSummary';

export default interface PlayerSummaryResponse {
  response: {
    players: PlayerSummary[];
  };
}
