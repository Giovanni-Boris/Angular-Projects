import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from './theme.state';

const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectThemeMode = createSelector(
  selectThemeState,
  (state) => state.darkMode
);