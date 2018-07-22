import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {NotifierService} from '../../notifier/notifier.service';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {

  protected chatName: string = '';
  constructor(private messageService: SocketService,
              private notifyService: NotifierService) { }

  ngOnInit() {
  }

  sendChatName() {
    // this.chatService.createChat(this.chatName).subscribe(
    //   (result)=> {
    //     console.log(result);
    //     // this.chats = result.data;
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
  }

}
