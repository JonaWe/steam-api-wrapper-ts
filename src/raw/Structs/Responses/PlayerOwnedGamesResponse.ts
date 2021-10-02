import Game from '../Game';

export default interface PlayerOwnedGamesResponse {
  response: {
    game_count: number;
    games: Game[];
  };
}
