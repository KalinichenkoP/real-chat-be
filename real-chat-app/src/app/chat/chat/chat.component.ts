import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from '../../notifier/notifier.service';
import {SocketService} from '../../services/socket.service';
import {Message} from '../../models/message';
import {MessageService} from '../../services/message.service';
import {ApiListResponse} from '../../../../classes/ApiListResponce';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected roomName: string = '';
  protected text: string = '';
  messages: Message[] = [];

  constructor(private route: ActivatedRoute,
              private socketService:SocketService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.initIoConnection();
    this.roomName = this.route.snapshot.paramMap.get('name');
    this.socketService.connectRoom(this.roomName);
    this.messageService.getMessages(this.roomName)
      .subscribe((message: Message[]) => this.messages = message);
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
    message.roomName = this.roomName;
    message.chatRoom = this.chatName;
    this.socketService.sendMessageSocket(message);
  }
}

