import {MessageStatus} from './message.status';

export class Message {
  uuid: string;
  text?: string;
  status: MessageStatus;
  reeadCount: number;
  senderId: number;
  roomId: number;
}
