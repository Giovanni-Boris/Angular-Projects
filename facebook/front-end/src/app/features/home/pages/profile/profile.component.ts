import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{
  ngDestroy$ : Subject<boolean>  = new Subject();
  user : User | null  = null;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((p) => p['username']),
        switchMap((username) => this.userService.getUser(-1, username)),
        takeUntil(this.ngDestroy$))
      .subscribe((user)=>{
        this.user = user;
      })
      
  }
  
  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete()
  }
  
}
