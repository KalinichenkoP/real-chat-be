
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
import {ConfigService} from "./services/ConfigService";
import {DatabaseModule} from "./models/database/DatabaseModule";
// import {ConfigService} from "./services/ConfigService";
// import {config} from "./development.env";


@Module({
    imports:
        [
            ConfigModule,
            UserModule,
            MessageModule,
            RoomModule,
            DatabaseModule,
            // TypeOrmModule.forRoot({
            //     type: 'postgres',
            //     name: config.postgres.name,
            //     host: config.postgres.host,
            //     port: config.postgres.port,
            //     database: config.postgres.database,
            //     username: config.postgres.username,
            //     password: config.postgres.password,
            //     entities: [
            //         User, Room
            //     ],
            //     migrations: [
            //         UserMigration, RoomMigration
            //     ],
            //     synchronize: true
            // }),
            // TypeOrmModule.forRoot({
            //     type: 'mongodb',
            //     name: config.mongodb.name,
            //     // replicaSet: "real-chat-replica",
            //     host: config.mongodb.host,
            //     port: config.mongodb.port,
            //     database: config.mongodb.database,
            //     entities: [Message],
            //     synchronize: true,
            // }),
            // TypeOrmModule.forRoot({
            //     type: 'postgres',
            //     name: 'postgres',
            //     host: 'localhost',
            //     port: 5432,
            //     database: 'postgres',
            //     username: 'postgres',
            //     password: 'postgres',
            //     entities: [
            //         User, Room
            //     ],
            //     migrations: [
            //         UserMigration, RoomMigration
            //     ],
            //     synchronize: true
            // }),
            // TypeOrmModule.forRoot({
            //     type: 'mongodb',
            //     name: 'nosql',
            //     // replicaSet: "real-chat-replica",
            //     host: 'localhost',
            //     port: 27017,
            //     database: 'test',
            //     entities: [Message],
            //     synchronize: true,
            // }),
            SocketModule,
        ],
})

export class ApplicationModule {
}
