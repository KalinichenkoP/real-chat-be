import {MessageStatus} from './message.status';
import * as uuidFactory from 'uuid';

export class Message {
  uuid: string;
  text?: string;
  status: MessageStatus;
  readCount: number;
  senderId: number;
  roomId: number;
  createdAt: Date;

  constructor(text: string, roomId: number) {
    this.uuid = uuidFactory.v4();
    this.text = text;
    this.status = MessageStatus.Pending;
    this.readCount = 0;
    this.roomId = roomId;
    this.senderId = 1;
    this.createdAt = new Date();
  }
}
