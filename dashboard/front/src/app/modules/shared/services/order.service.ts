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
  createOrder(order: {
    Amount: number;
    Method: string;
    Status: string;
    productId: number;
    userId: string;
  }): Observable<string> {
    let { productId, userId, ...others } = order;
    return this.http
      .post(
        Global.API_URL + `orders/${productId}/${userId}/create-order`,
        others,
        { responseType: 'text' }
      )
      .pipe(catchError(this.handleError));
  }
  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(Global.API_URL + 'orders/all', {})
      .pipe(catchError(this.handleError));
  }
  getOrdersUser(id: string): Observable<Order[]> {
    if (id === '') return throwError(() => 'Cannot be an empty string');
    return this.http
      .get<Order[]>(Global.API_URL + 'orders/user/' + id, {})
      .pipe(catchError(this.handleError));
  }
  getOrdersProduct(id: number = -1): Observable<Order[]> {
    if (id === -1) return throwError(() => 'Cannot be negative');
    return this.http
      .get<Order[]>(Global.API_URL + 'orders/product/' + id, {})
      .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
