import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Friend } from 'src/app/models/friend.models';
import { User } from 'src/app/models/user.model';
import { followUser, unfollowUser } from 'src/app/store/user/user.actions';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-profile-rightbar',
  templateUrl: './profile-rightbar.component.html',
  styleUrls: ['./profile-rightbar.component.css'],
})
export class ProfileRightbarComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private userService: UserService) {}
  _user: User | null = null;
  friends: Friend[] = [];
  currentUser: User | null = null;
  ngOnDestroy$ = new Subject<void>();
  followed: boolean = false;

  @Input() set user(value: User | null) {
    if (!value) return;
    this._user = value;
    this.isFollow();
    this.getFriends(value.userId);
  }
  get user() {
    return this._user;
  }

  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((user) => {
        this.currentUser = user;
        this.isFollow();
      });
  }
  isFollow() {
    this.followed =
      this.currentUser?.followings.some(
        (el) => el.userId === this.user?.userId
      ) || false;
  }

  getFriends(id: number) {
    this.userService
      .getFriends(id)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((friends) => (this.friends = friends));
  }
  handleClick() {
    if(!this.currentUser || !this.user) return;
    if (this.followed)
      this.store.dispatch(
        unfollowUser({userId :this.currentUser.userId, id:this.user.userId})
      );
    else 
      this.store.dispatch(
        followUser({userId :this.currentUser.userId, id:this.user.userId})
      );
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
