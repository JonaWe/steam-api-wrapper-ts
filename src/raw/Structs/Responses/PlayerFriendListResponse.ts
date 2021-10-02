import Friend from '../Friend';

export default interface PlayerFriendListResponse {
  friendslist: {
    friends: Friend[];
  };
}
