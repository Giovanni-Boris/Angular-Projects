import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', component: HomePageComponent },
];
