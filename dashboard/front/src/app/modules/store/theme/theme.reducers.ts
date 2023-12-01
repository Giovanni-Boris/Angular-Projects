import { createReducer, on } from '@ngrx/store';
import { setLightTheme, setDarkTheme, toggleTheme } from './theme.actions';
import { initialState } from './theme.state';

export const themeReducer = createReducer(
  initialState,
  on(setLightTheme, (state) => ({ ...state, darkMode: false })),
  on(setDarkTheme, (state) => ({ ...state, darkMode: true })),
  on(toggleTheme, (state) => ({ ...state, darkMode: !state.darkMode }))
);
