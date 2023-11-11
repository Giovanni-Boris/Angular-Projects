import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Global } from 'src/global';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  constructor(private http: HttpClient) {}

  getUser( id: number = -1, name: string = "") : Observable<User> {
    let api = "user?" + (id==-1 ? `name=${name}` : `userId=${id}`);
    return this.http
      .get<User>( Global.API_URL+api, {})
      .pipe(
        tap(data=>console.log("User  ", data)),
        catchError(this.handleError)
      )
    ;
  }
  getTimelinePosts( userId:number= -1) : Observable<Post[]> {
    if(userId===-1) throwError(()=>"Cannot be negative");
    return this.http
      .get<Post[]>( Global.API_URL+`post/timeline/${userId}`, {})
      .pipe(
        tap(data=>console.log("Posts  ", data)),
        catchError(this.handleError)
      )
    ;
  }
  getProfilePosts( name:string = "") : Observable<Post[]> {
    if(name==="") throwError(()=>"Cannot be negative");
    return this.http
      .get<Post[]>( Global.API_URL+`post/profile/${name}`, {})
      .pipe(
        tap(data=>console.log("Posts  ", data)),
        catchError(this.handleError)
      )
    ;
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }

}
