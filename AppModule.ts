import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/UserModule";
import {MessageModule} from "./models/message/MessageModule";
import {SocketModule} from './models/socket/SocketModule';
import {RoomModule} from './models/room/RoomModule';
import {ConfigModule} from './models/config/ConfigModule';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Room} from "./models/room/RoomEntity";
import {User} from "./models/user/UserEntity";
import {UserMigration} from "./migration/User.migration";
import {RoomMigration} from "./migration/Room.migration";
import {Message} from "./models/message/MessageEntity";

@Module({
    imports:
        [
            UserModule,
            MessageModule,
            RoomModule,
            TypeOrmModule.forRoot({
                type: 'postgres',
                name: 'postgres',
                host: 'localhost',
                port: 5432,
                database: 'postgres',
                username: 'postgres',
                password: 'postgres',
                entities: [
                    User, Room
                ],
                migrations: [
                    UserMigration,RoomMigration
                ],
                synchronize: true
            }),
            TypeOrmModule.forRoot({
                type: 'mongodb',
                name: 'nosql',
                // replicaSet: "real-chat-replica",
                host: 'localhost',
                port: 27017,
                database: 'test',
                entities: [Message],
                synchronize: true,
            }),
            SocketModule,
            ConfigModule
        ]
})

export class ApplicationModule {
}
