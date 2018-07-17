import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import * as RedisAdapter from "socket.io-redis";

@WebSocketGateway(3001, {adapter: RedisAdapter({host:'localhost', port: 6379})})
export class EventsGateway {
    @WebSocketServer() server;

    @SubscribeMessage('events')
    onEvent(client, data): Observable<WsResponse<number>> {
        console.log(data);
        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({ event, data: res })));
    }
}
