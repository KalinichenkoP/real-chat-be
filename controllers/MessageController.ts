import {Body, Controller, Get, Param, Post, Query, Res, UsePipes} from '@nestjs/common';
import {MessageService} from "../models/message/MessageService";
import {Message} from "../models/message/MessageEntity";
import {JoiValidationPipe} from '../core/pipes/JoiValidationPipe';
import {CreateMessageSchema} from '../models/message/schemas/CreateMessageSchema';
import {CreateMessageDto} from '../models/message/dto/CreateMessageDto';
import {SocketService} from '../models/socket/SocketService';
import {UpdateWriteOpResult} from 'typeorm';
import {ReadMessageDto} from '../models/message/dto/ReadMessageDto';
import {ReadMessageSchema} from '../models/message/schemas/ReadMessageSchema';
import {FindByIdSchema} from '../core/schemas/FindByIdSchema';
import {FindMessagesSchema} from '../models/message/schemas/FindMessagesSchema';
import {FindMessagesDto} from '../models/message/dto/FindMessagesDto';

@Controller('messages')
export class MessageController {

    constructor(private readonly messageService: MessageService,
                private readonly socketService: SocketService) {
    }

    @Get()
    @UsePipes(new JoiValidationPipe<FindMessagesDto>(new FindMessagesSchema()))
    findAll(@Query() query: FindMessagesDto): Promise<Message[]> {
        return this.messageService.findAll(query);
    }

    @Get(':roomId')
    @UsePipes(new JoiValidationPipe<number>(new FindByIdSchema()))
    findByRoomName(@Param("roomId") roomId: number): Promise<Message[]> {
        return this.messageService.findByRoomId(roomId);
    }

    @Post()
    @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    async createOne(@Body() body: CreateMessageDto): Promise<Message> {
        const message: Message  = await this.messageService.createMessage(body);
        this.socketService.emitMessage(message.toDto());
        return message;
    }

    @Get(':userId')
    @UsePipes(new JoiValidationPipe<number>(new FindByIdSchema()))
    async findOne(@Param('userId') userId: number): Promise<Message> {
        return this.messageService.findByUserId(userId);
    }

    @Post('read')
    @UsePipes(new JoiValidationPipe<ReadMessageDto>(new ReadMessageSchema()))
    async updateOne(@Body() body: ReadMessageDto, @Res() res): Promise<void> {
        const result: UpdateWriteOpResult =  await this.messageService.updateReadAmount(body.messageUUID);
        if (result.result.ok === 1 ){
            this.socketService.emitUpdatedInfo(body.messageUUID, body.roomId);
        }
        return res.json('ok');
    }
}
