import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Global } from 'src/global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<User> {
    console.log("credaemtials", credentials);
    return this.http.post<User>( Global.API_URL+'auth/authenticate', credentials);
  }


}
