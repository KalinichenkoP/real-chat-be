export class CreateMessageDto {
    readonly uuid: string;

    readonly text?: string;

    readonly roomId: number;

    readonly senderId: number;

    readonly createdAt: Date;


}
