import {Module} from "@nestjs/common";
import {Message} from "../message/MessageEntity";
import {User} from "../user/UserEntity";
import {Room} from "../room/RoomEntity";
import {UserMigration} from "../../migration/User.migration";
import {ConfigModule} from "../config/ConfigModule";
import {RoomMigration} from "../../migration/Room.migration";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports:
        [
            ConfigModule,
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
            TypeOrmModule.forRoot({
                type: 'postgres',
                name: 'postgres',
                host: 'postgres',
                port: 5432,
                database: 'postgres',
                username: 'postgres',
                password: 'postgres',
                entities: [
                    User, Room
                ],
                migrations: [
                    UserMigration, RoomMigration
                ],
                synchronize: true
            }),
            TypeOrmModule.forRoot({
                type: 'mongodb',
                name: 'nosql',
                replicaSet: "real-app-chat",
                host: 'mongodb-primary',
                port: 27017,
                database: 'real-app',
                entities: [Message],
                synchronize: true,
            }),
        ],
})

export class DatabaseModule {
}
