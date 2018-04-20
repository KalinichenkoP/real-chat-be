import {Connection} from "typeorm";
import {User} from "./user.entity";
import {CONNECTION_TOKEN} from "../../constants/connection.tokens";
import {REPOSITORY_TOKEN} from "../../constants/repository.tokens";

export const userProvider = [
    {
        provide: REPOSITORY_TOKEN.USER_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [CONNECTION_TOKEN.SQL_CONNECTION_TOKEN],
    },
];
