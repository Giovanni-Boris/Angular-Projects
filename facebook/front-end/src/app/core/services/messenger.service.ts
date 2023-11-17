import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Global } from 'src/global';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  constructor(private http: HttpClient) {}
  
  getConversations(userId: number = -1) : Observable<[]>{
    if (userId === -1) return throwError(() => 'Cannot be negative');
    return this.http.get<[]>( Global.API_URL+`conversation/${userId}`, {});

  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}