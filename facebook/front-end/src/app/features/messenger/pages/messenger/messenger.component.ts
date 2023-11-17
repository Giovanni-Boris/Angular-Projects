import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MessengerService } from 'src/app/core/services/messenger.service';
import { User } from 'src/app/models/user.model';
import { Conversation } from 'src/app/models/conversation.model';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { Message } from 'src/app/models/message.model';

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
  messages: Message[] = []
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
    this.getMessages(this._currentChat.id);
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
  getMessages(chatId: number){
    this.messengerService.getMessages(chatId)
    .pipe(takeUntil(this.ngOnDestroy$))
    .subscribe((messages) => {
      this.messages = messages;
    });

  }
  handleSubmit(): void{

  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
