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
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as uuidFactory from 'uuid';
import {MessageStatus} from '../../models/message.status';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  protected room: Room;
  protected text: string = '';
  protected createMessageForm: FormGroup;
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
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.roomService.getRoomById(parseInt(paramMap.get('roomId'), 10)).subscribe((room: Room) => {
        this.room = room;
        this.socketService.connectRoom(this.room.id);
        this.messageService.getMessages(this.room.id)
          .subscribe((message: Message[]) => this.messages = message);
      });
      this.getUsersByRoom(parseInt(paramMap.get('roomId')));
      this.createMessageForm = new FormGroup({
          'uuid': new FormControl(uuidFactory.v4()),
          'text': new FormControl(this.text, [Validators.required]),
          'roomId': new FormControl(paramMap.get('roomId')),
          'senderId': new FormControl(10)
        }
      );
    });
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage()
      .subscribe((message: Message) => {
        let newMessage: Message = this.findMessageByUUID(message.uuid);
        if (!newMessage) {
          this.messages.push(message);
        } else {
          newMessage.status = MessageStatus.Send;
        }
        let user: User = this.findUserById(message.senderId);
        if (!user) {
          this.getUser(message.senderId);
        }
      });
  }

  sendMessage() {
    this.messageService.sendMessage(this.createMessageForm).subscribe((message: Message) => this.messages.push(message));
    this.createMessageForm.reset({uuid: uuidFactory.v4(), text: '', roomId: this.room.id, senderId: 10});
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.users.push(user);
    });
  }

  getUsersByRoom(roomId: number) {
    this.userService.getUserByRoom(roomId).subscribe((result: ApiListResponse<User>) => {
      this.users = result.data;
    });
  }

  findUserById(id: number): User {
    return this.users.filter((user: User) => user.id === id)[0];
  }

  findMessageByUUID(uuid: string): Message {
    console.log(this.messages.filter((message: Message) => message.uuid === uuid));
    return this.messages.filter((message: Message) => message.uuid === uuid)[0];
  }
}
