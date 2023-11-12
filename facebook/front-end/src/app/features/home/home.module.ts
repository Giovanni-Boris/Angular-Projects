import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeRoutingModule } from './home.routing';
import { CoreModule } from 'src/app/core/core.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FeedComponent } from './components/feed/feed.component';
import { RightbarComponent } from './components/rightbar/rightbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeRightbarComponent } from './components/home-rightbar/home-rightbar.component';
import { CloseFriendComponent } from './components/close-friend/close-friend.component';
import { PostComponent } from './components/post/post.component';
import { ShareComponent } from './components/share/share.component';
import { FormsModule } from '@angular/forms';
import { ProfileRightbarComponent } from './components/profile-rightbar/profile-rightbar.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    SidebarComponent,
    FeedComponent,
    RightbarComponent,
    HomeRightbarComponent,
    CloseFriendComponent,
    PostComponent,
    ShareComponent,
    ProfileRightbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    MatIconModule,
    FormsModule
  ]
})
export class HomeModule { }
