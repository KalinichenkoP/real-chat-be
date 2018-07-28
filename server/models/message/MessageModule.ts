import {Module} from "@nestjs/common";
import {MessageService} from "./MessageService";
import {MessageController} from "../../controllers/MessageController";
import {DatabaseModule} from "../../database/DatabaseModule";
import {messageProvider} from "./MessageProvider";
import {SocketGateway} from '../socket/SocketGateway';

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    providers: [...messageProvider, MessageService, SocketGateway],
})
export class MessageModule {
}
