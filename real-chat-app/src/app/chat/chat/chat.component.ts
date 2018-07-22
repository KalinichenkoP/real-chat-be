import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from '../../notifier/notifier.service';
import {SocketService} from '../../services/socket.service';
import {Message} from '../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected chatName: string = '';
  protected text: string = '';
  messages: Message[] = [];

  constructor(private route: ActivatedRoute,
              private socketService:SocketService,) {
  }

  ngOnInit() {
    this.initIoConnection();
    this.chatName = this.route.snapshot.paramMap.get('name');
    this.socketService.connectRoom(this.chatName);
    // this.messageService.connect();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });
  }

  sendMessageSocket() {
    const message = new Message();
    message.text = this.text;
    message.senderId = 10;
    message.chatRoom = this.chatName;
    this.socketService.sendMessageSocket(message);
  }
}

