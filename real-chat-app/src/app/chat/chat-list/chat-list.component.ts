import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {NotifierService} from '../../notifier/notifier.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  private chats = [];

  constructor(private chatService: ChatService,
              private notifyService: NotifierService) { }

  async ngOnInit() {
    await this.chatService.getChatList().subscribe(
      (result)=> {
        this.chats = result.data;
      }, (error) => {
        console.log(error);
      }
    );
  }

}
