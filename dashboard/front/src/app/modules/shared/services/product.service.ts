import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Global } from '../constants/global';
import { Product } from '../interfaces/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(Global.API_URL + 'products', {})
      .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
