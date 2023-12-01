import { Route } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { SingleUserPageComponent } from './pages/single-user-page/single-user-page.component';

export const USER_ROUTES: Route[] = [
  { path: '', component: ListComponent },
  { path: 'new', component: NewUserPageComponent },
  { path: ':userId', component: SingleUserPageComponent },
];
