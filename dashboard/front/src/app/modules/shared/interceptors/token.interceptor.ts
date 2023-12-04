import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from '../../store/user/user.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {
    console.log('Creating interceptor');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('skip')) {
      req = req.clone({
        headers: req.headers.delete('skip'),
      });
    } else {
      this.store.select(selectToken).subscribe((token) => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token.token}`,
            },
          });
        }
      });
    }

    return next.handle(req);
  }
}
