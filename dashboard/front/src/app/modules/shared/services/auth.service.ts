import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Global } from '../constants/global';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<Token> {
    return this.http.post<Token>( Global.API_URL+'Auth/login', credentials);
  }
  register( registerCredentials: { name: string, email: string, password:string} ) : Observable<{token:string}> {
    return this.http
      .post<{ token: string}>( Global.API_URL+'auth/register', registerCredentials)
      .pipe(
        tap(data=>console.log("Token  ", data)),
        catchError(this.handleError)
      )
    ;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}