import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Global } from 'src/global';
import { Post, PostUpload } from 'src/app/models/post.model';
import { Friend } from 'src/app/models/friend.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number = -1, name: string = ''): Observable<User> {
    let api = 'user?' + (id == -1 ? `name=${name}` : `userId=${id}`);
    return this.http
      .get<User>(Global.API_URL + api, {})
      .pipe(catchError(this.handleError));
  }
  getTimelinePosts(userId: number = -1): Observable<Post[]> {
    if (userId === -1) return throwError(() => 'Cannot be negative');
    return this.http
      .get<Post[]>(Global.API_URL + `post/timeline/${userId}`, {})
      .pipe(
        map((data: Post[]) => this.sortPosts(data)),
        catchError(this.handleError)
      );
  }
  getProfilePosts(name: string = ''): Observable<Post[]> {
    if (name === '') return throwError(() => 'Cannot be negative');
    return this.http
      .get<Post[]>(Global.API_URL + `post/profile/${name}`, {})
      .pipe(
        map((data: Post[]) => this.sortPosts(data)),
        catchError(this.handleError)
      );
  }
  getFriends(id: number = -1): Observable<Friend[]> {
    if (id === -1) return throwError(() => 'Cannot be negative');
    return this.http
      .get<Friend[]>(Global.API_URL + `user/friends/${id}`, {})
      .pipe(catchError(this.handleError));
  }
  followUser(id: number, userId: number): Observable<string> {
    return this.http
      .put(
        Global.API_URL + `user/${id}/follow`,
        { userId },
        { responseType: 'text' }
      )
      .pipe(catchError(this.handleError));
  }
  unfollowUser(id: number, userId: number): Observable<string> {
    return this.http
      .put(
        Global.API_URL + `user/${id}/unfollow`,
        { userId },
        { responseType: 'text' }
      )
      .pipe(catchError(this.handleError));
  }
  createPost(postUpload: PostUpload): Observable<Post> {
    return this.http
      .post<Post>(Global.API_URL + `post/`, postUpload)
      .pipe(catchError(this.handleError));
  }

  likePost(id: number, userId: number): Observable<string> {
    return this.http
      .put(
        Global.API_URL + `post/${id}/like`,
        { userId },
        { responseType: 'text' }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
  private sortPosts(posts: Post[]): Post[] {
    return posts.sort(
      (p1, p2) =>
        new Date(p2.creationdate).getTime() -
        new Date(p1.creationdate).getTime()
    );
  }
}
