import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, getUserData, getUserDataSuccess, getUserDataFailure } from './user.actions';
import { User } from 'src/app/models/user.model';
import { Token } from 'src/app/models/token.models';

export interface AuthState {
  token: Token | null,
  user: User | null,
  isFetching: boolean,
  error: string | null,
}

export const initialState : AuthState = {
  token: null,
  user: null,
  isFetching: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoading: true })),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error
  }) ),
  on(getUserData, (state) => ({ ...state, isLoading: true })),
  on(getUserDataSuccess, (state, { user }) => ({
    ...state,
    user
  })),
  on(getUserDataFailure, (state, { error }) => ({
    ...state,
    error
  })),

);