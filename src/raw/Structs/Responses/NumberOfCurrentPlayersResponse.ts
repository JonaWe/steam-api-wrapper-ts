export default interface NumberOfCurrentPlayersResponse {
  response: {
    result: 1 | 42;
    player_count?: number;
  };
}
