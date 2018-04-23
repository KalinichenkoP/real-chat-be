import {createConnection} from 'typeorm';
import {CONNECTION_TOKEN} from "../enums/ConnectionTokens";
import {User} from "../models/user/UserEntity";
import {Message} from "../models/message/MessageEntity";

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
                User
            ],
            synchronize: true
        }),
    },
    {
        provide: CONNECTION_TOKEN.MONGO_CONNECTION_TOKEN,
        useFactory: async () => await createConnection({
            type: 'mongodb',
            name: 'nosql',
            host: 'localhost',
            port: 27017,
            database: 'test',
            entities: [Message],
            synchronize: true
        }),
    },
];
