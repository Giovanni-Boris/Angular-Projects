import { Component, Input, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Conversation } from 'src/app/models/conversation.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  constructor(private userServive:UserService){}
  @Input()
  conversation!: Conversation;
  @Input()
  currentUser!: User | null;
  user:  User|null =  null;
  ngOnDestroy$ = new Subject<void>();
  getUser(userId : number){
    this.userServive.getUser(userId)
    .pipe(takeUntil(this.ngOnDestroy$))
    .subscribe((user)=>{
      this.user = user;
    })
  }
  ngOnChanges(changes: SimpleChanges): void{
    let changeConversation = changes['conversation'];
    if(changeConversation.previousValue !== changeConversation.currentValue){
        const friendId = this.conversation.members.find((m) => m !== this.currentUser?.userId);
        this.getUser(friendId ?? -1);
      }
  }
}
