import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-rightbar',
  templateUrl: './profile-rightbar.component.html',
  styleUrls: ['./profile-rightbar.component.css']
})
export class ProfileRightbarComponent {
  @Input()
  user: User |null = null;
}
