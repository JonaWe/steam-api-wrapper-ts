import Group from '../Group';

export default interface PlayerGroupListResponse {
  response: {
    success: boolean;
    groups: Group[];
  };
}
