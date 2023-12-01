import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
} from './user.actions';
import { initialState } from '../theme/theme.state';


export const userReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isFetching: true })),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isFetching: false
  })),
  on(getUserData, (state) => ({ ...state, isFetching: true })),
  on(getUserDataSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(getUserDataFailure, (state, { error }) => ({
    ...state,
    error,
    isFetching: false
  }))
);