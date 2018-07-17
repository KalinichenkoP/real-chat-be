import {Module} from "@nestjs/common";
import {MessageService} from "./MessageService";
import {MessageController} from "./MessageController";
import {DatabaseModule} from "../../database/DatabaseModule";
import {messageProvider} from "./MessageProvider";

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    providers: [...messageProvider, MessageService],
})
export class MessageModule {
}
