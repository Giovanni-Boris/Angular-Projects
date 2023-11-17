import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Conversation } from 'src/app/models/conversation.model';
import { Message } from 'src/app/models/message.model';
import { Global } from 'src/global';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  constructor(private http: HttpClient) {}

  getConversations(userId: number = -1): Observable<Conversation[]> {
    if (userId === -1) return throwError(() => 'Cannot be negative');
    return this.http
      .get<Conversation[]>(Global.API_URL + `conversation/${userId}`, {})
      .pipe(catchError(this.handleError));
  }
  getMessages(chatId: number): Observable<Message[]> {
    return this.http
      .get<Message[]>(Global.API_URL + `message/${chatId}`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
