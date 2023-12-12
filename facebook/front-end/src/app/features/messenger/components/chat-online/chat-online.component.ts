import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessengerService } from 'src/app/core/services/messenger.service';
import { UserService } from 'src/app/core/services/user.service';
import { Conversation } from 'src/app/models/conversation.model';
import { Friend } from 'src/app/models/friend.models';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-online',
  templateUrl: './chat-online.component.html',
  styleUrls: ['./chat-online.component.css'],
})
export class ChatOnlineComponent implements OnChanges, OnDestroy {
  constructor(
    private userService: UserService,
    private messengerService: MessengerService
  ) {}
  ngOnDestroy$ = new Subject<void>();
  _friends: Friend[] = [];
  onlineFriends: Friend[] = [];
  @Input()
  onlineUsers: number[] = [];
  @Input()
  currentId: number | undefined;
  @Output() setcurrentChat: EventEmitter<Conversation> =
    new EventEmitter<Conversation>();
  set friends(frds: Friend[]) {
    this._friends = frds;
    this.filter();
  }
  get friends() {
    return this._friends;
  }
  filter(){
    this.onlineFriends = this._friends.filter((f) =>
      this.onlineUsers.includes(f._id)
    );
  }
  handleClick(el: Friend) {
    this.messengerService
      .getConversationsMembers(el._id, this.currentId)
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((conversation) => {
        this.setcurrentChat.emit(conversation);
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    let changeUsers = changes['onlineUsers'];
    let changeId = changes['currentId'];
    if (changeId && changeId.previousValue !== changeId.currentValue) {
      this.userService
        .getFriends(changeId.currentValue)
        .pipe(takeUntil(this.ngOnDestroy$))
        .subscribe((friends) => {
          this.friends = friends;
        });
    }
    if (changeUsers && changeUsers.previousValue !== changeUsers.currentValue){
      this.filter();
    }

  }
  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
