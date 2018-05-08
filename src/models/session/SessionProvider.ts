import {Connection} from "typeorm";
import {CONNECTION_TOKEN} from "../../enums/ConnectionTokens";
import {REPOSITORY_TOKEN} from "../../enums/RepositoryTokens";
import {Session} from "./SessionEntity";

export const sessionProvider = [
    {
        provide: REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(Session),
        inject: [CONNECTION_TOKEN.MONGO_CONNECTION_TOKEN],
    },
];
