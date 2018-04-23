import {Connection} from "typeorm";
import {CONNECTION_TOKEN} from "../../enums/ConnectionTokens";
import {REPOSITORY_TOKEN} from "../../enums/RepositoryTokens";
import {Message} from "./MessageEntity";

export const messageProvider = [
    {
        provide: REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(Message),
        inject: [CONNECTION_TOKEN.MONGO_CONNECTION_TOKEN],
    },
];
