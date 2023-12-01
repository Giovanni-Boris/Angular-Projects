import { createAction, props } from '@ngrx/store';
import { Token } from '../../shared/interfaces/token.model';
import { User } from '../../shared/interfaces/user.model';


export const login = createAction(
  '[User] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ token: Token }>()
);
export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const getUserData = createAction(
  '[User] Get User Data',
  props<{ id: number }>()
);
export const getUserDataSuccess = createAction(
  '[User] Get User Data Success',
  props<{ user: User }>()
);
export const getUserDataFailure = createAction(
  '[User] Get User Data Failure',
  props<{ error: string }>()
);
