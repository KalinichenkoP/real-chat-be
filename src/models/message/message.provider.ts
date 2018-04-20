import {Connection} from "typeorm";
import {CONNECTION_TOKEN} from "../../constants/connection.tokens";
import {REPOSITORY_TOKEN} from "../../constants/repository.tokens";
import {Message} from "./message.entity";

export const messageProvider = [
    {
        provide: REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(Message),
        inject: [CONNECTION_TOKEN.MONGO_CONNECTION_TOKEN],
    },
];
