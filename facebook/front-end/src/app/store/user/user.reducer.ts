import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './user.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  token: string | null,
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
  }) )
);