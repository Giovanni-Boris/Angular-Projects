import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedComponent } from './feed/feed.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { ShareComponent } from './share/share.component';
import { PostComponent } from './post/post.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    FeedComponent,
    RightbarComponent,
    ShareComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports :[
    TopbarComponent,
    RightbarComponent,
    FeedComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
