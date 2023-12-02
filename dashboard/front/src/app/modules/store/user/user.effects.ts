import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({Username, Password}) =>
        this.authService.login({Username, Password}).pipe(
          map((token) => UserActions.loginSuccess({token})),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );
/*
  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUserData),
      switchMap(({ id }) =>
        this.userService.getUser(id).pipe(
          map((user) => AuthActions.getUserDataSuccess({ user })),
          catchError((error) => of(AuthActions.getUserDataFailure({ error })))
        )
      )
    )
  );*/

 
  
}