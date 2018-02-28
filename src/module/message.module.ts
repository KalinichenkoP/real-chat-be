import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageService} from "../service/message.service";
import {MessageController} from "../controller/message.controller";
import {Message} from "../entity/message";

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    components: [MessageService],
})
export class MessageModule {}
