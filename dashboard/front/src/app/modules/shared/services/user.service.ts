import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Global } from '../constants/global';
import { Token } from '../interfaces/token.model';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    console.log('creating userService');
  }

  getUserData(id: string): Observable<User> {
    if (id === '') return throwError(() => 'Cannot be an empty string');
    return this.http
      .post<User>(Global.API_URL + 'users/' + id, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}