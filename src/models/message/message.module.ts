import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageService} from "./message.service";
import {MessageController} from "./message.controller";
import {Message} from "./message.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mongodb',
        name: 'nosql',
        host: 'localhost',
        port: 27017,
        database: 'test',
        entities: [Message],
        synchronize: true
    })],
    controllers: [MessageController],
    components: [MessageService],
})
export class MessageModule {
}
