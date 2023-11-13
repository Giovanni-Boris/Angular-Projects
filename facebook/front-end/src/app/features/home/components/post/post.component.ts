import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private userService: UserService) {}
  _post!: Post;
  @Input() set post(value: Post) {
    this._post = value;
    this.likes = value.likes.length;
    this.isLiked = value.likes.some((el) => el.userId == this.user?.userId);
    this.fetchUser(value.userId);
  }
  get post(): Post {
    return this._post;
  }
  likes: number = 0;
  isLiked: boolean = false;
  currentUser: User | null = null;
  user: User | null = null;
  ngOnDestro$ = new Subject<void>();
  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(takeUntil(this.ngOnDestro$))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }
  fetchUser(userId: number) {
    this.userService
      .getUser(userId)
      .pipe(takeUntil(this.ngOnDestro$))
      .subscribe((user) => {
        this.user = user;
      });
  }
  handleLike() {
    if (!this.currentUser) return;
    this.userService
      .likePost(this.post.id, this.currentUser.userId)
      .pipe(takeUntil(this.ngOnDestro$))
      .subscribe((mess) => {
        console.log(mess);
        this.likes = this.isLiked ? this.likes - 1 : this.likes + 1;
        this.isLiked = false;
      });
  }
  ngOnDestroy(): void {
    this.ngOnDestro$.next();
    this.ngOnDestro$.complete();
  }
}
