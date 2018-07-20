import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {NotifierService} from '../../notifier/notifier.service';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected chatName: string = '';
  protected text: string = '';

  constructor(private route: ActivatedRoute,
              private messageService: MessageService,) {
  }

  ngOnInit() {
    this.chatName = this.route.snapshot.paramMap.get('name');
    this.messageService.connectRoom(this.chatName);
    // this.messageService.connect();
  }

  sendMessageSocket() {
    const message = new Message();
    message.text = this.text;
    message.senderId = 10;
    message.chatRoom = this.chatName;
    this.messageService.sendMessageSocket(message);
  }
}

