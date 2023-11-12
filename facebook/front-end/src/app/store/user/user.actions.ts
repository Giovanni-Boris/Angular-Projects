import { createAction, props } from '@ngrx/store';
import { Token } from 'src/app/models/token.models';
import { User } from 'src/app/models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: Token }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const getUserData = createAction(
  '[Auth] Get User Data',
  props<{ id: number }>()
);
export const getUserDataSuccess = createAction(
  '[Auth] Get User Data Success',
  props<{ user: User }>()
);
export const getUserDataFailure = createAction(
  '[Auth] Get User Data Failure',
  props<{ error: string }>()
);

export const followUser = createAction(
  '[Auth] Follow User',
  props<{ id: number, userId: number }>()
);

export const followUserSuccess = createAction(
  '[Auth] Follow User Success',
  props<{ id: number }>()
);

export const followUserFailure = createAction(
  '[Auth] Follow User Failure',
  props<{ error: string }>()
);

export const unfollowUser = createAction(
  '[Auth] UnFollow User',
  props<{ id: number, userId: number }>()
);

export const unfollowUserSuccess = createAction(
  '[Auth] UnFollow User Success',
  props<{ id: number }>()
);

export const unfollowUserFailure = createAction(
  '[Auth] UnFollow User Failure',
  props<{ error: string }>()
);