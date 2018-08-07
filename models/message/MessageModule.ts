import {Module} from "@nestjs/common";
import {MessageService} from "./MessageService";
import {MessageController} from "../../controllers/MessageController";
import {SocketGateway} from '../socket/SocketGateway';
import {Message} from "./MessageEntity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Message], 'nosql')],
    controllers: [MessageController],
    providers: [MessageService, SocketGateway],
})
export class MessageModule {
}
