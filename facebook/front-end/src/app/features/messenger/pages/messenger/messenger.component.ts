import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MessengerService } from 'src/app/core/services/messenger.service';
import { User } from 'src/app/models/user.model';
import { Conversation } from 'src/app/models/conversation.model';
import { selectUserData } from 'src/app/store/user/user.selectors';
import { Message } from 'src/app/models/message.model';
import { WebSocketService } from 'src/app/core/services/webSocket.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private store: Store,
    private messengerService: MessengerService,
    private webSocketService: WebSocketService
  ) {}
  _currentChat: Conversation | null = null;
  _user: User | null = null;
  ngOnDestroy$ = new Subject<void>();
  conversations: Conversation[] = [];
  _messages: Message[] = [];
  onlineUsers: number[] = [];
  newMessage: string = '';
  _arrivalMessage: Message | null = null;
  @ViewChildren('scrollRef') messagesDivs!: QueryList<ElementRef>;

  set user(value: User | null) {
    if (!value) return;
    this._user = value;
    this.getConversations(value.userId);
    let that = this;
    this.webSocketService.connect(
      value.userId,
      '/topic/public',
      function (message) {
        if (message instanceof Array) {
          that.onlineUsers =
            that.user?.followings.filter((f) =>
              message.some((userId) => userId === f.userId)
            ).map(el=>el.userId) ?? [];
        } else if (message.owner !== that._user?.userId)
          that.arrivalMessage = { ...message, creationdate: new Date() };
      }
    );
  }
  get user(): User | null {
    return this._user;
  }
  set currentChat(value: Conversation |null) {
    if(!value) return;
    this._currentChat = value;
    this.getMessages(this._currentChat.id);
  }
  get currentChat(): Conversation | null {
    return this._currentChat;
  }
  set messages(msgs: Message[]) {
    this._messages = msgs;
  }
  get messages(): Message[] {
    return this._messages;
  }
  set arrivalMessage(value: Message) {
    this._arrivalMessage = value;
    if (this.currentChat?.members.includes(value.owner))
      this.messages = [...this.messages, this._arrivalMessage];
  }
  get arrivalMessage(): Message | null {
    return this._arrivalMessage;
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
  getMessages(chatId: number) {
    this.messengerService
      .getMessages(chatId)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  handleSubmit(): void {
    if (!this.user) return;
    const receiverId = this.currentChat?.members.find(
      (member) => member !== this.user?.userId
    );
    const message = {
      text: this.newMessage,
      owner: this.user.userId,
      conversationId: this.currentChat!.id,
    };
    this.webSocketService.send('/app/sendMessage', message);

    this.messengerService
      .postMessage(message)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((msg) => {
        this.messages = [...this.messages, msg];
        this.newMessage = '';
      });
  }
  ngAfterViewInit() {
    this.messagesDivs.changes
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(() => {
        if (this.messagesDivs && this.messagesDivs.last) {
          this.messagesDivs.last.nativeElement.scrollIntoView({
            behavior: 'smooth',
          });
        }
      });
  }
  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
    this.webSocketService.disconnect();
  }
}
