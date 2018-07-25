import {Message} from '../message';

export class ServerMessageDto {
  readonly uuid: string;

  readonly text: string;

  readonly senderId: number;

  readonly roomId: number;

  readonly createdAt: Date;

  constructor(message: Message) {
    this.uuid = message.uuid;
    this.text = message.text;
    this.senderId = message.senderId;
    this.roomId = message.roomId;
    this.createdAt = message.createdAt;
  }
}
