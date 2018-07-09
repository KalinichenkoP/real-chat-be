import {Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {MessageService} from "./MessageService";
import {Message} from "./MessageEntity";

@Controller('api/v1/messages')
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

    // @Get(':id')
    // findOne(@Param() params): Promise<Message> {
    //     console.log(params.id);
    //     return this.messageService.findById(params.id);
    // }
}
