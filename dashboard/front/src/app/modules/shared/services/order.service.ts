import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Global } from '../constants/global';
import { Order } from '../interfaces/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(Global.API_URL + 'orders/all', {})
      .pipe(catchError(this.handleError));
  }
  getOrdersUser(id: string): Observable<Order[]> {
    if (id === '') return throwError(() => 'Cannot be an empty string')
    return this.http
      .get<Order[]>(Global.API_URL + 'orders/user/'+id, {})
      .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
