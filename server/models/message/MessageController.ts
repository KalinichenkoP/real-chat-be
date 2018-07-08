import {Controller, Get, Param, Res} from '@nestjs/common';
import {MessageService} from "./MessageService";
import {Message} from "./MessageEntity";

@Controller('api/v1/messages')
export class MessageController {

    constructor(private readonly messageService: MessageService) {}

    @Get()
    findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }

    @Get(':userId')
    async findOne(@Res() res, @Param('userId') userId): Promise<Message> {
        console.log(userId);
        console.log()
        return this.messageService.findByUser(userId);
    }

    // @Get(':id')
    // findOne(@Param() params): Promise<Message> {
    //     console.log(params.id);
    //     return this.messageService.findById(params.id);
    // }
}
