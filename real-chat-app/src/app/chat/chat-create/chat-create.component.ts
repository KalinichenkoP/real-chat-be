import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {NotifierService} from '../../notifier/notifier.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {

  protected chatName: string = '';
  constructor(private chatService: ChatService,
              private messageService: MessageService,
              private notifyService: NotifierService) { }

  ngOnInit() {
  }

  sendChatName() {
    this.chatService.createChat(this.chatName).subscribe(
      (result)=> {
        console.log(result);
        // this.chats = result.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

}
