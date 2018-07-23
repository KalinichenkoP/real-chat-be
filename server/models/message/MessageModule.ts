import {Module} from "@nestjs/common";
import {MessageService} from "./MessageService";
import {MessageController} from "./MessageController";
import {DatabaseModule} from "../../database/DatabaseModule";
import {messageProvider} from "./MessageProvider";
import {SocketService} from '../../../real-chat-app/src/app/services/socket.service';

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    providers: [...messageProvider, MessageService, SocketService],
})
export class MessageModule {
}
