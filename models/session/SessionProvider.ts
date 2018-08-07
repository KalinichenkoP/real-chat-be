import {Connection} from "typeorm";
import {CONNECTION_TOKEN} from "../../enums/ConnectionTokens";
import {REPOSITORY_TOKEN} from "../../enums/RepositoryTokens";
import {Session} from "./SessionEntity";

export const sessionProvider = [
    {
        provide: REPOSITORY_TOKEN.SESSION_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(Session),
        inject: [CONNECTION_TOKEN.SQL_CONNECTION_TOKEN],
    },
];
