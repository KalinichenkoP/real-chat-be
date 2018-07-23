import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as redisAdapter from 'socket.io-redis';
import {MessageService} from '../message/MessageService';
import {MessageDto} from '../message/dto/MessageDto';

@WebSocketGateway( {adapter: redisAdapter({host: 'localhost', port: 6379})})
export class EventsGateway {
    @WebSocketServer() server;

    constructor(private readonly messageService: MessageService) {
    }

    // @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    @SubscribeMessage('message')
    onEventConnect(client, message: MessageDto): Observable<WsResponse<number>> {
        this.messageService.createMessage(message)
            .then(result => {
                    this.server.to(message.roomId).emit('message', message);
                },
                error => {
                    console.log(error);
                });
        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }

    @SubscribeMessage('connectRoom')
    onEventConnectRoom(client, roomId: number): Observable<WsResponse<number>> {
        this.server.of('/').adapter.remoteJoin(client.id, roomId.toString(), (err) => {
            // this.server.of('/').adapter.clientRooms(client.id, (err, clientRooms) => {
                // console.log('clientRooms');
                // console.log(clientRooms);
            // });
            // this.server.of('/').adapter.clients([room], (err, clients) => {
            //     console.log('clientsRoom');
            //     console.log(clients);
            // });
            // this.server.of('/').adapter.allRooms((err, rooms) => {
            //     console.log('allRooms');
            //     console.log(rooms);
            // });
            console.log(err);
        });

        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }
}
