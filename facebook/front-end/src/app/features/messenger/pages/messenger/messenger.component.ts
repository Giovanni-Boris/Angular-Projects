import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MessengerService } from 'src/app/core/services/messenger.service';
import { User } from 'src/app/models/user.model';
import { Conversation } from 'src/app/models/conversation.model';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private messengerService: MessengerService
  ) {}
  _currentChat: Conversation | null = null;
  _user: User | null = null;
  ngOnDestroy$ = new Subject<void>();
  conversations: Conversation[] = [];
  set user(value: User | null) {
    if (!value) return;
    this._user = value;
    this.getConversations(value.userId);
  }
  get user(): User | null {
    return this._user;
  }
  set currentChat(value: Conversation) {
    this._currentChat = value;
  }
  get currentChat(): Conversation | null {
    return this._currentChat;
  }
  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((el) => {
        this.user = el;
      });
  }
  getConversations(userId: number) {
    this.messengerService
      .getConversations(userId)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((conversations) => {
        this.conversations = conversations;
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
