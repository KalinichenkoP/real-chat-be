import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {NotifierService} from '../../notifier/notifier.service';
import {SocketService} from '../../services/socket.service';
import {Message} from '../../models/message';
import {MessageService} from '../../services/message.service';
import {ApiListResponse} from '../../../../classes/ApiListResponce';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Room} from '../../models/room';
import {RoomService} from '../../services/room.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected room: Room;
  protected text: string = '';
  messages: Message[] = [];
  users: User[] = [];

  constructor(private route: ActivatedRoute,
              private socketService: SocketService,
              private userService: UserService,
              private roomService: RoomService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.initIoConnection();

    // this.room.id = parseInt(this.route.snapshot.paramMap.get('roomId'), 10);
    //
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.roomService.getRoomById(parseInt(paramMap.get('roomId'), 10)).subscribe((room: Room) => {
        this.room = room;
        this.socketService.connectRoom(this.room.id);
        this.messageService.getMessages(this.room.id)
          .subscribe((message: Message[]) => this.messages = message);
      });
    });
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
    message.roomId = this.room.id;
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

