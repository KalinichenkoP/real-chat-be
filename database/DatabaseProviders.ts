import {createConnection} from 'typeorm';
import {CONNECTION_TOKEN} from "../enums/ConnectionTokens";
import {User} from "../models/user/UserEntity";
import {Message} from "../models/message/MessageEntity";
import {UserMigration} from "../migration/User.migration";
import { RoomMigration} from '../migration/Room.migration';
import {Room} from '../models/room/RoomEntity';

export const databaseProviders = [
    {
        provide: CONNECTION_TOKEN.SQL_CONNECTION_TOKEN,
        useFactory: async () => await createConnection({
            type: 'postgres',
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
    },
    {
        provide: CONNECTION_TOKEN.MONGO_CONNECTION_TOKEN,
        useFactory: async () => await createConnection({
            type: 'mongodb',
            name: 'nosql',
            // replicaSet: "real-chat-replica",
            host: 'localhost',
            port: 27017,
            database: 'test',
            entities: [Message],
            synchronize: true
        }),
    },
];
