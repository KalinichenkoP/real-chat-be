import {createConnection} from "typeorm";

export const databaseProviders = [
    {
        provide: 'DbConnectionToken1',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 3306,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [
                __dirname + '/models/user/user.entity.ts',
            ],
            synchronize: true,
            logging: true,
        }),
    },
    {
        provide: 'DbConnectionToken2',
        useFactory: async () => await createConnection({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'test',
            entities: [
                __dirname + '/models/message/message.entity.ts',
            ],
            synchronize: true,
        }),
    },
];
