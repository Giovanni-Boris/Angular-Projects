import { Component } from '@angular/core';
import { Users } from 'src/data/dummyData';
@Component({
  selector: 'app-home-rightbar',
  templateUrl: './home-rightbar.component.html',
  styleUrls: ['./home-rightbar.component.css']
})
export class HomeRightbarComponent {
  public users = Users;
}
