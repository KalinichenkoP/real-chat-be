import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import * as redisAdapter from 'socket.io-redis';

import {MessageDto} from '../message/dto/MessageDto';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from "../user/UserEntity";

@WebSocketGateway({adapter: redisAdapter({host: 'localhost', port: 6379, key: "real-chat-websockets"})})
export class SocketService {
    @WebSocketServer() server;

    emitMessage(message: MessageDto) {
        this.server.to(message.roomId.toString()).emit('message', message);
    }

    emitUpdatedInfo(messageUUID: string, roomId: string) {
        this.server.to(roomId).emit('messageUpdate', messageUUID);
    }

    connectAllToNewRoom(roomId: string) {
        this.server.of('/').adapter.clients((err, clients) => {
            if (!err) {
                clients.map((client: string) => {
                    this.server.of('/').adapter.remoteJoin(client, roomId, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            }
        })
    }

    @SubscribeMessage('connectRoom')
    onEventConnectRoom(client, roomId: number): Observable<WsResponse<number>> {
        this.server.of('/').adapter.remoteJoin(client.id, roomId.toString(), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }
}
