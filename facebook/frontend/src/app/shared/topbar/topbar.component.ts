import { Component } from '@angular/core';

const PF ="path to the files";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  user: String = "Boris";


}
