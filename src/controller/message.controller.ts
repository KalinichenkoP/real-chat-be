import {Controller, Get, Param} from "@nestjs/common";
import {MessageService} from "../service/message.service";
import {Message} from "../entity/message";

@Controller('user')
export class MessageController {


    constructor(private readonly messageService: MessageService) {}

    @Get()
    findAll(): Promise<Message[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<Message> {
        console.log(params.id);
        return this.messageService.findById(params.id);
    }
}
