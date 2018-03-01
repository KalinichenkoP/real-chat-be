import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageService} from "./message.service";
import {MessageController} from "./message.controller";
import {Message} from "./message";
import {MessageProvider} from "./message.provider";
import {MongoEntityManager} from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    components: [MessageService]
})
export class MessageModule {
}
