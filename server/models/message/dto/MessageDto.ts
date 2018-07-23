import {Message} from '../MessageEntity';

export class MessageDto {
    readonly uuid: string;

    readonly text: string;

    readonly senderId: number;

    readonly roomId: number;

    constructor(message: Message) {
        // super(message);
        this.uuid = message.uuid;
        this.text = message.text;
        this.senderId = message.senderId;
        this.roomId = message.roomId;
    }
}
