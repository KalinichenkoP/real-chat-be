import {Module} from "@nestjs/common";
import {MessageService} from "./MessageService";
import {MessageController} from "./MessageController";
import {DatabaseModule} from "../../database/DatabaseModule";
import {messageProvider} from "./MessageProvider";
import {EventsGateway} from '../events/EventsGateway';

@Module({
    imports: [DatabaseModule],
    controllers: [MessageController],
    providers: [...messageProvider, MessageService, EventsGateway],
})
export class MessageModule {
}
