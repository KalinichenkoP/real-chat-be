import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageService} from "./message.service";
import {MessageController} from "./message.controller";
import {Message} from "./message.entity";
import {messageProviders} from "./messageProviders";
import {DatabaseModule} from "../../util/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    components: [...messageProviders, MessageService],
})
export class MessageModule {
}
