import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent  {
  public user$ = this.store.select(selectUserData);

  constructor(private store:Store){}
  

}
