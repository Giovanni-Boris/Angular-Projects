import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Global } from '../constants/global';
import { Token } from '../interfaces/token.model';
import { UserUpload } from '../interfaces/userUpload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: {
    Username: string;
    Password: string;
  }): Observable<Token> {
    return this.http
      .post<Token>(Global.API_URL + 'Auth/login', credentials)
      .pipe(catchError(this.handleError));
  }
  register(registerCredentials: UserUpload): Observable<string> {
    console.log(registerCredentials)
    return this.http
      .post(
        Global.API_URL + 'Auth/register',
        { ...registerCredentials, isAdmin: true },
        { responseType: 'text' }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
