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


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    SidebarComponent,
    FeedComponent,
    RightbarComponent,
    HomeRightbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    MatIconModule,

  ]
})
export class HomeModule { }
