export interface User {
  userId: number;
  name: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  description: string;
  country: string;
  relationship: number;
  followers?: [] | null;
  followings?: [] | null;
  posts?: [] | null;
}
