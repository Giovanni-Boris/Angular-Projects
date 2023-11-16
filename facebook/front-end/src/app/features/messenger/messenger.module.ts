import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerComponent } from './pages/messenger/messenger.component';
import { CoreModule } from 'src/app/core/core.module';
import { MessengerRoutingModule } from './messenger.routing';
import { ChatOnlineComponent } from './components/chat-online/chat-online.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { MessageComponent } from './components/message/message.component';
import { CustomDateFormatPipe } from 'src/app/shared/pipes/dateformat.pipe';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MessengerComponent,
    ChatOnlineComponent,
    ConversationComponent,
    MessageComponent,
    
  ],
  imports: [
    CommonModule,
    CoreModule,
    MessengerRoutingModule,
    SharedModule

  ]
})
export class MessengerModule { }
