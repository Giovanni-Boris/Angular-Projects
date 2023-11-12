import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
  followUser,
  unfollowUser,
  followUserSuccess,
  unfollowUserSuccess,
  followUserFailure,
  unfollowUserFailure,
} from './user.actions';
import { User } from 'src/app/models/user.model';
import { Token } from 'src/app/models/token.models';

export interface AuthState {
  token: Token | null;
  user: User;
  isFetching: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  user: {
    userId: 0,
    name: '',
    email: '',
    profilePicture: '',
    coverPicture: '',
    description: '',
    country: '',
    relationship: 1,
    followers: [],
    followings: [],
    posts: [],
  },
  isFetching: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoading: true })),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(getUserData, (state) => ({ ...state, isLoading: true })),
  on(getUserDataSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(getUserDataFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(followUser, (state) => ({ ...state, isLoading: true })),
  on(followUserSuccess, (state, { id }) => ({
    ...state,
    user: {
      ...state.user,
      followings: [...state.user.followings, {userId: id }],
    },
  })),
  on(followUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(unfollowUser, (state) => ({ ...state, isLoading: true })),
  on(unfollowUserSuccess, (state, { id }) => ({
    ...state,
    user: {
      ...state.user,
      followings: state.user.followings.filter(
        (follow) =>{ follow.userId !== id}
      ),
    },
  })),
  on(unfollowUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
