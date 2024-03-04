export type IFriend = {
    id: string;
    firstName: string;
  };
  
  export interface UserProfileRes {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    followers: IFriend[];
    following: IFriend[];
    friends: IFriend[];
    stats: {
      totalFollowers: number;
      totalFollowing: number;
      totalFriends: number;
    };
  }