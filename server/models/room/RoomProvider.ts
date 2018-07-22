import {Connection} from "typeorm";
import {CONNECTION_TOKEN} from "../../enums/ConnectionTokens";
import {REPOSITORY_TOKEN} from "../../enums/RepositoryTokens";
import {Room} from "./RoomEntity";

export const roomProvider = [
    {
        provide: REPOSITORY_TOKEN.ROOM_REPOSITORY_TOKEN,
        useFactory: (connection: Connection) => connection.getRepository(Room),
        inject: [CONNECTION_TOKEN.SQL_CONNECTION_TOKEN],
    },
];
