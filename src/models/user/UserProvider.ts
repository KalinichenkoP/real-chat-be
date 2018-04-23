import {Connection} from "typeorm";
import {User} from "./UserEntity";
import {CONNECTION_TOKEN} from "../../enums/ConnectionTokens";
import {REPOSITORY_TOKEN} from "../../enums/RepositoryTokens";

export const userProvider = [
    {
        provide: REPOSITORY_TOKEN.USER_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [CONNECTION_TOKEN.SQL_CONNECTION_TOKEN],
    },
];
