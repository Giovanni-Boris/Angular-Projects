import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import * as AuthActions from './user.actions';
import { UserService } from 'src/app/core/services/user.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((token) => AuthActions.loginSuccess({ token })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

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
  );

  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.followUser),
      switchMap(({ id, userId }) =>
        this.userService.followUser(id, userId).pipe(
          map(() => AuthActions.followUserSuccess({ id })),
          catchError((error) => of(AuthActions.followUserFailure({ error })))
        )
      )
    )
  );

  unfollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.unfollowUser),
      switchMap(({ id, userId }) =>
        this.userService.unfollowUser(id, userId).pipe(
          map(() => AuthActions.unfollowUserSuccess({ id })),
          catchError((error) => of(AuthActions.unfollowUserFailure({ error })))
        )
      )
    )
  );
}
