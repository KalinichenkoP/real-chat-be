import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {NotifierService} from '../../notifier/notifier.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {

  constructor(private chatService: ChatService,
              private notifyService: NotifierService) { }

  ngOnInit() {
  }

}
