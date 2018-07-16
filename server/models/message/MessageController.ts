import {Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {MessageService} from "./MessageService";
import {Message} from "./MessageEntity";

@Controller('messages')
export class MessageController {

    constructor(private readonly messageService: MessageService) {}

    @Get()
    findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }
    @Post()
    createOne(@Req() req): Promise<Message> {
        return this.messageService.createMessage(req.body);
    }

    @Get(':userId')
    async findOne(@Res() res, @Param('userId') userId): Promise<Message> {
        return this.messageService.findByUserId(userId);
    }
}
