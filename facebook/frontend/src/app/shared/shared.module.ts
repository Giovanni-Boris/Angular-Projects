import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedComponent } from './feed/feed.component';
import { RightbarComponent } from './rightbar/rightbar.component';


@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    FeedComponent,
    RightbarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports :[
    TopbarComponent,
    RightbarComponent,
    FeedComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
