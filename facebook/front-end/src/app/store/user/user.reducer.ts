import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './user.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null,
  isFetching: boolean,
  error: string | null,
}

export const initialState : AuthState = {
  user: null,
  isFetching: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoading: true })),
  on(loginSuccess, (state, { user }) => ({
    user,
    isFetching: false,
    error: null
  })),
  on(loginFailure, (state, { error }) => ({
    user:null,
    isFetching: false,
    error
  }) )
);