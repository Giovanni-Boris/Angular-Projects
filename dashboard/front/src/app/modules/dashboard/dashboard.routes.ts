import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'orders', component: CreateOrderComponent },
];
