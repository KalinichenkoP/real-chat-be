import {Body, Controller, Get, Param, Post, Req, Res, UsePipes} from '@nestjs/common';
import {MessageService} from "./MessageService";
import {Message} from "./MessageEntity";
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';
import {CreateMessageSchema} from '../../core/schemas/CreateMessageSchema';
import {CreateMessageDto} from './dto/CreateMessageDto';

@Controller('messages')
export class MessageController {

    constructor(private readonly messageService: MessageService) {}

    @Get()
    findAll(@Param("roomName") roomName): Promise<Message[]> {
        return this.messageService.findAll(roomName);
    }

    @Post()
    @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    createOne(@Body() body): Promise<Message> {
        return this.messageService.createMessage(body);
    }

    @Get(':userId')
    async findOne(@Res() res, @Param('userId') userId): Promise<Message> {
        return this.messageService.findByUserId(userId);
    }
}
