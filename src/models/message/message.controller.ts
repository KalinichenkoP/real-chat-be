import {Controller, Get, Param} from "@nestjs/common";
import {MessageService} from "./message.service";
import {Message} from "./message";

@Controller('message')
export class MessageController {


    constructor(private readonly messageService: MessageService) {}

    @Get()
    findAll(): Promise<Message[]> {
        return this.messageService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<Message> {
        console.log(params.id);
        return this.messageService.findById(params.id);
    }
}
