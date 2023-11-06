import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import * as AuthActions from './user.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login), 
      switchMap(({email, password}) =>
        this.authService.login({email, password}).pipe(
          map(({token}) => AuthActions.loginSuccess({token})),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
}
