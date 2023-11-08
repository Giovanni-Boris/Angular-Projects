import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Global } from 'src/global';

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
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }

}
