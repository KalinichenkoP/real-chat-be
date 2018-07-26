import {Body, Controller, Get, Param, Patch, Post, Req, Res, UsePipes} from '@nestjs/common';
import {MessageService} from "./MessageService";
import {Message} from "./MessageEntity";
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';
import {CreateMessageSchema} from '../../core/schemas/CreateMessageSchema';
import {CreateMessageDto} from './dto/CreateMessageDto';
import {SocketService} from '../../../real-chat-app/src/app/services/socket.service';
import {EventsGateway} from '../events/EventsGateway';
import {UpdateWriteOpResult} from 'typeorm';

@Controller('messages')
export class MessageController {

    constructor(private readonly messageService: MessageService,
                private readonly eventGateway: EventsGateway) {

    }

    @Get()
    findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }

    @Get(':roomId')
    findByRoomName(@Param("roomId") roomId): Promise<Message[]> {
        return this.messageService.findByRoomId(roomId);
    }

    @Post()
    @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    async createOne(@Body() body): Promise<Message> {
        const message: Message  = await this.messageService.createMessage(body);
        this.eventGateway.emitMessage(message.toDto());
        return message;
    }

    @Get(':userId')
    async findOne(@Res() res, @Param('userId') userId): Promise<Message> {
        return this.messageService.findByUserId(userId);
    }

    @Patch('/read/:roomId/:messageUUID')
    async updateOne(@Param('messageUUID') messageUUID: string, @Param('roomId') roomId: string): Promise<void> {
        console.log(messageUUID);
        console.log(roomId);
        const result: UpdateWriteOpResult =  await this.messageService.updateReadAmount(messageUUID);
        console.log('emit');
        if (result.result.ok === 1 ){
            this.eventGateway.emitUpdatedInfo(messageUUID, roomId);
        }
    }
}
