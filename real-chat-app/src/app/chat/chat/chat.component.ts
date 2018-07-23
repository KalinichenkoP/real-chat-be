import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from '../../notifier/notifier.service';
import {SocketService} from '../../services/socket.service';
import {Message} from '../../models/message';
import {MessageService} from '../../services/message.service';
import {ApiListResponse} from '../../../../classes/ApiListResponce';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected roomName: string = '';
  protected text: string = '';
  messages: Message[] = [];
  users: User[] = [];

  constructor(private route: ActivatedRoute,
              private socketService: SocketService,
              private userService: UserService,
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
        let user: User = this.findUserById(message.senderId);
        if (!user) {
          this.getUser(message.senderId);
        }
      });
  }

  sendMessageSocket() {
    const message = new Message();
    message.text = this.text;
    message.roomName = this.roomName;
    message.senderId = 10;
    this.socketService.sendMessage(message);
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.users.push(user);
    });
  }

  findUserById(id: number): User {
    return this.users.filter((user: User) => user.id === id)[0];
  }
}

