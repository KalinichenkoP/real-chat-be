
import { Connection, Repository } from 'typeorm';
import {Message} from "./message.entity";

export const messageProviders = [
    {
        provide: 'messageRepositoryToken',
        useFactory: (connection: Connection) => connection.getMongoRepository(Message),
        inject: ['DbConnectionToken'],
    },
];
