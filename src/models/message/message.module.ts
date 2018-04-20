import {Module} from "@nestjs/common";
import {MessageService} from "./message.service";
import {MessageController} from "./message.controller";
import {DatabaseModule} from "../database/database.module";
import {messageProvider} from "./message.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    components: [...messageProvider, MessageService],
})
export class MessageModule {
}
