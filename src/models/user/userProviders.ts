
import { Connection} from 'typeorm';
import {User} from "./user.entity";

export const userProviders = [
    {
        provide: 'userRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DbConnectionToken1'],
    },
];
