import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as redisAdapter from 'socket.io-redis';
import {MessageService} from '../message/MessageService';
import {Message} from '../message/MessageEntity';
import {inject} from '@angular/core';

@WebSocketGateway(3001, {adapter: redisAdapter({host: 'localhost', port: 6379})})
export class EventsGateway {
    @WebSocketServer() server;

    constructor(private readonly messageService: MessageService) {
    }


    // @SubscribeMessage('events')
    // onEvent(client, data): Observable<WsResponse<number>> {
    //     console.log(data);
    //
    //     const event = 'events';
    //     const response = [1, 2, 3];
    //
    //     return from(response).pipe(map(res => ({ event, data: res })));
    // }

    @SubscribeMessage('message')
    onEventConnect(client, data): Observable<WsResponse<number>> {
        console.log(data);
        console.log(client);
        this.messageService.createMessage(data)
            .then(result => {
                    this.server.of('/').adapter.clientRooms(data.room, (err, clientRooms) => {
                        this.server.to(data.room).emit('message', data);
                        console.log('clientRooms');
                        console.log(clientRooms);
                    });
                },
                error => {
                    console.log(error);
                });
        // console.log(client.id);
        // let roomArray = [];
        // this.server.of('/').adapter.allRooms((err, rooms) => {
        //     roomArray = rooms;
        //     console.log('rooms');
        //     console.log(rooms);
        // });
        // this.server.of('/').adapter.clientRooms(client.id, (err, rooms) => {
        //     console.log('clientRooms');
        //     console.log(rooms);
        // });
        // this.server.of('/').adapter.clients(roomArray, (err, clients) => {
        //     console.log('clients');
        //     console.log(clients);
        // });
        // console.log(this.server.adapter().adapter);
        // this.server.adapter().clients((err, clients) => {
        //     console.log('clients'); // an array containing all connected socket ids
        //     console.log(clients); // an array containing all connected socket ids
        // });
        // this.server.allRooms((err, rooms) => {
        //     console.log('rooms'); // an array containing all rooms (accross every node)
        //     console.log(rooms); // an array containing all rooms (accross every node)
        //     console.log('err'); // an array containing all rooms (accross every node)
        //     console.log(err); // an array containing all rooms (accross every node)
        // });
        // console.log(client);
        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }
}
