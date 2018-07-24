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

  private initIoConnection(): any {
    this.socketService.initSocket();

    this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.checkAndPushMessage(message);
        this.checkAndPushUser(message.senderId);
      });
  }

  sendMessage() {
    this.messageService.sendMessage(this.createMessageForm).subscribe((message: Message) => this.checkAndPushMessage(message));
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

  async checkAndPushUser(id: number): Promise<any> {
    let user: User = await this.users.filter((user: User) => user.id === id)[0];
    if (!user) {
      this.getUser(id);
    }
  }

  async checkAndPushMessage(newMessage: Message): Promise<any> {
    console.log(this.messages.filter((message: Message) => message.uuid === newMessage.uuid));
    let checkMessage: Message = await this.messages.filter((message: Message) => message.uuid === newMessage.uuid)[0];
    if (!checkMessage) {
      this.messages.push(newMessage);
    } else {
      newMessage.status = MessageStatus.Send;
    }
  }
}
