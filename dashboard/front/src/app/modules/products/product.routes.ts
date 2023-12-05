import { Route } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';
import { SingleUserPageComponent } from './pages/single-product-page/single-product-page.component';

export const PRODUCT_ROUTES: Route[] = [
  { path: '', component: ListComponent },
  { path: 'new', component: NewProductPageComponent },
  { path: ':productId', component: SingleUserPageComponent },
];
