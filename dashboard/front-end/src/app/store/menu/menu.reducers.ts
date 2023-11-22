import { createReducer, on } from '@ngrx/store';
import { initialState } from './menu.state';
import * as menuActions from './menu.actions';
export const menuReducers = createReducer(
  initialState,
  on(menuActions.toggleChat, (state) => ({ ...state, chat: !state.chat })),
  on(menuActions.toggleCart, (state) => ({ ...state, cart: !state.cart })),
  on(menuActions.toggleUserProfile, (state) => ({
    ...state,
    userProfile: !state.userProfile,
  })),
  on(menuActions.toggleNotification, (state) => ({
    ...state,
    notification: !state.notification,
  }))
);
