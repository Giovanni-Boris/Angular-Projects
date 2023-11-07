import { Component } from '@angular/core';

const iconNames = [
  { icon: 'rss_feed', name: 'Feed' },
  { icon: 'chat', name: 'Chats' },
  { icon: 'play_circle_filled', name: 'Videos' },
  { icon: 'group', name: 'Groups' },
  { icon: 'bookmark', name: 'Bookmarks' },
  { icon: 'help_outline', name: 'Questions' },
  { icon: 'work_outline', name: 'Jobs' },
  { icon: 'event', name: 'Events' },
  { icon: 'school', name: 'Courses' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public iconNames = iconNames;
}
