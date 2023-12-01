import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { themeReducer } from './modules/store/theme/theme.reducers';
import { userReducer } from './modules/store/user/user.reducers';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes, withHashLocation()),
    provideStore({ theme: themeReducer, user : userReducer }),
    provideHttpClient(),
  ],
};
