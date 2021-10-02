export default interface GetNumberOfCurrentPlayersResponse {
  response: {
    result: 1 | 42;
    player_count?: number;
  };
}
