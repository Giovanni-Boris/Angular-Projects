import { createAction, props } from '@ngrx/store';
import { Token } from 'src/app/models/token.models';

export const login = createAction('[Auth] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: Token }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const getUserData = createAction('[Auth] Get User Data', props<{ id: number }>());
export const getUserDataSuccess = createAction('[Auth] Get User Data Success', props<{ user: any }>());
export const getUserDataFailure = createAction('[Auth] Get User Data Failure', props<{ error: string }>());
