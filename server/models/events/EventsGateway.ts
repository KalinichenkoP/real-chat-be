import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as redisAdapter from 'socket.io-redis';

import {MessageDto} from '../message/dto/MessageDto';

@WebSocketGateway({adapter: redisAdapter({host: 'localhost', port: 6379, key: "real-chat-websockets"})})
export class EventsGateway {
    @WebSocketServer() server;

    emitMessage(message: MessageDto) {
        console.log('emitMessage');
        console.log(message);
        this.server.to(message.roomId.toString()).emit('message', message);
    }

    emitUpdatedInfo(messageUUID: string, roomId: string) {
        this.server.to(roomId).emit('messageUpdate', messageUUID);
    }

    // @SubscribeMessage('connectRoom')
    // onEventConnectRoom(client, roomId: number): Observable<WsResponse<number>> {
    //     console.log(client.id);
    //     this.server.of('/').adapter.remoteJoin(client.id, roomId.toString(), (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    //
    //     const event = 'events';
    //     const response = [1, 2, 3];
    //
    //     return from(response).pipe(map(res => ({event, data: res})));
    // }
}
