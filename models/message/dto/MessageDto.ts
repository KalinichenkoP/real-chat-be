import {Message} from '../MessageEntity';
import {TimeManager} from '../../../core/utils/TimeManager';

export class MessageDto {
    readonly uuid: string;

    readonly text: string;

    readonly senderId: number;

    readonly roomId: number;

    readonly createdAt:  number;

    constructor(message: Message) {
        this.uuid = message.uuid;
        this.text = message.text;
        this.senderId = message.senderId;
        this.roomId = message.roomId;
        this.createdAt = TimeManager.getUTCSeconds(message.createdAt);
    }
}
