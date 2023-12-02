import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      debounceTime(300),
      switchMap(({Username, Password}) =>
        this.authService.login({Username, Password}).pipe(
          map((token) => UserActions.loginSuccess({token})),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserData),
      switchMap(({ id }) =>
        this.userService.getUserData(id).pipe(
          map((user) => UserActions.getUserDataSuccess({ user })),
          catchError((error) => of(UserActions.getUserDataFailure({ error })))
        )
      )
    )
  );

 
  
}