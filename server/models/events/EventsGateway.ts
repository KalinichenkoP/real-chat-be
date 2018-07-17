import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway(3001)
export class EventsGateway {
    @WebSocketServer() server;

    @SubscribeMessage('events')
    onEvent(client, data): Observable<WsResponse<number>> {
        console.log(client);
        console.log(data);
        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({ event, data: res })));
    }
}
