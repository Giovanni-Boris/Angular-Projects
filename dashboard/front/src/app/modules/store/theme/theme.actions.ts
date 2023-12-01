import { createAction } from '@ngrx/store';

export const setLightTheme = createAction('[Theme] Set Light');
export const setDarkTheme = createAction('[Theme] Set Dark');
export const toggleTheme = createAction('[Theme] Toggle');