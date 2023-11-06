import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/store/user/user.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Intercepting");
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token.token}`,
          },
        });
      }
    });

    return next.handle(req);
  }
}
