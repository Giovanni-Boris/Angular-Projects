import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, filter, map, switchMap, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  name: String | undefined;
  _user: User | null = null;
  posts: Post[] = [];
  ngDestroyed$ = new Subject<void>();

  set user(value: User | null) {
    if (!value || this.name !== undefined) return;
    this._user = value;
    this.timelinePosts(value.userId);
  }
  get user() {
    return this._user;
  }
  public constructor(private store: Store, private userService: UserService) {}
  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((user) => {
        this.user = user;
      });
  }
  getPosts() {
    if (this.user) this.timelinePosts(this.user.userId);
  }
  timelinePosts(userId: number) {
    this.userService
      .getTimelinePosts(userId)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((posts) => {
        this.posts = posts;
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    let changeName = changes['name'];
    if (!changeName) return;
    if (
      changeName.currentValue &&
      changeName.currentValue !== changeName.previousValue
    ) {
      this.userService
        .getProfilePosts(changeName.currentValue)
        .pipe(takeUntil(this.ngDestroyed$))
        .subscribe((posts) => (this.posts = posts));
    }
  }
  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
