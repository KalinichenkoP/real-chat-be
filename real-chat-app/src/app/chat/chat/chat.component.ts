import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {NotifierService} from '../../notifier/notifier.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected chatName: string = '';
 protected text: string = '';

  constructor( private route: ActivatedRoute,
               private messageService: MessageService,) { }

  ngOnInit() {
    this.chatName = this.route.snapshot.paramMap.get('name');
  }

  sendMessage() {
    this.messageService.sendMessage(this.text, this.chatName).subscribe(
      (result)=> {
        console.log(result);
        // this.chats = result.data;
      }, (error) => {
        console.log(error);
      }
    );
  }


}
