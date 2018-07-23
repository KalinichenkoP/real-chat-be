export class CreateMessageDto {
    readonly text: string;

    readonly roomId: number;

    readonly senderId: number;
}
