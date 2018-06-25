import {Connection} from "typeorm";
import {CONNECTION_TOKEN} from "../../enums/ConnectionTokens";
import {REPOSITORY_TOKEN} from "../../enums/RepositoryTokens";
import {Channel} from "./ChannelEntity";

export const channelProvider = [
    {
        provide: REPOSITORY_TOKEN.CHANNEL_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(Channel),
        inject: [CONNECTION_TOKEN.SQL_CONNECTION_TOKEN],
    },
];
