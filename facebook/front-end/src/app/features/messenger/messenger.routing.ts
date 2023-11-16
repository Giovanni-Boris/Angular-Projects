import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessengerComponent } from './pages/messenger/messenger.component';

const routes: Routes = [
  {
    path: '',
    component: MessengerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessengerRoutingModule { }