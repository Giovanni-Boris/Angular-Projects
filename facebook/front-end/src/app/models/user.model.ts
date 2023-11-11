import { Friend } from './friend.models';

export interface User {
  userId: number;
  name: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  description: string;
  country: string;
  relationship: number;
  followers?: [{ userId: number }] | null;
  followings?: [{ userId: number }] | null;
  posts?: [] | null;
}
