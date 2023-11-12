import { Friend } from './friend.models';

export interface User {
  userId: number ;
  name: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  description: string;
  country: string;
  relationship: number;
  followers: Follow[] ;
  followings: Follow[];
  posts: [] ;
}

export interface Follow {
  userId:number;
}