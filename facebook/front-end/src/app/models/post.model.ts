export interface Post {
  id: number
  description: string
  img: string
  likes: any[]
  creationdate: string
  updatedate: string
}


export interface PostUpload {
  description: String;
  img: String;
  userId: number;
}
