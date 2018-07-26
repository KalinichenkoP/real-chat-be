import {MessageStatus} from './message.status';
import * as uuidFactory from 'uuid';
import {ServerMessageDto} from './dto/ServerMessageDto';

export class Message {
  uuid: string;
  text?: string;
  status: MessageStatus;
  readAmount: number;
  senderId: number;
  roomId: number;
  createdAt: Date;

  constructor(text: string, roomId: number) {
    this.uuid = uuidFactory.v4();
    this.text = text;
    this.status = MessageStatus.Pending;
    this.readAmount = 0;
    this.roomId = roomId;
    this.senderId = 1;
    this.createdAt = new Date();
  }

  toServerDto() {
    return new ServerMessageDto(this);
  }
}
