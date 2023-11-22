import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './menu.state';

export const selectAppState = createFeatureSelector<MenuState>('menu');

export const selectChat = createSelector(selectAppState, (state) => state.chat);
export const selectCart = createSelector(selectAppState, (state) => state.cart);
export const selectUserProfile = createSelector(selectAppState, (state) => state.userProfile);
export const selectNotification = createSelector(selectAppState, (state) => state.notification);
