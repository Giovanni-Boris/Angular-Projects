export interface Post {
  description: string;
  img: string;
  likes: [{ userId: number }];
  creationdate: string;
  userId: number;
  id: number
}

export interface PostUpload {
  description: String;
  img: String;
  userId: number;
}
