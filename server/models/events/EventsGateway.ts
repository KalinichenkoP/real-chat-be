import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as redisAdapter from 'socket.io-redis';
import {MessageService} from '../message/MessageService';
import {MessageDto} from '../message/dto/MessageDto';
const {promisify} = require('util');

@WebSocketGateway(3001, {adapter: redisAdapter({host: 'localhost', port: 6379})})
export class EventsGateway {
    @WebSocketServer() server;

    constructor(private readonly messageService: MessageService,
                // private readonly roomService: RoomService) {
                ) {
    }

    // @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    @SubscribeMessage('message')
    onEventConnect(client, message: MessageDto): Observable<WsResponse<number>> {
        this.messageService.createMessage(message)
            .then(result => {
                    this.server.of('/').adapter.clientRooms(message.chatRoom, (err, clientRooms) => {
                        this.server.to(message.chatRoom).emit('message', message);
                        this.server.to(message.chatRoom).emit('rooms', {test: "ok"});
                    });
                },
                error => {
                    console.log(error);
                });

        this.server.of('/').adapter.allRooms((err, rooms) => {
            console.log('rooms');
            console.log(rooms);
        });
        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }
    //
    // @SubscribeMessage('createRoom')
    // onEventCreate(client, room: RoomDto): Observable<WsResponse<number>> {
    //     console.log(room);
    //     this.roomService.createRoom(room)
    //         .then(result => {
    //                 this.server.of('/').adapter.remoteJoin(client.id, result.name, (err) => {
    //                     console.log(err);
    //                 });
    //             },
    //             error => {
    //                 console.log(error);
    //             });
    //     this.server.of('/').adapter.allRooms((err, rooms) => {
    //         console.log('rooms');
    //         console.log(rooms);
    //     });
    //     const event = 'events';
    //     const response = [1, 2, 3];
    //
    //     return from(response).pipe(map(res => ({event, data: res})));
    // }

    @SubscribeMessage('connectRoom')
    onEventConnectRoom(client, room: string): Observable<WsResponse<number>> {

        this.server.of('/').adapter.remoteJoin(client.id, room, (err) => {
            this.server.of('/').adapter.clientRooms(client.id, (err, clientRooms) => {
                console.log('clientRooms');
                console.log(clientRooms);
            });
            this.server.of('/').adapter.clients([room], (err, clients) => {
                console.log('clientsRoom');
                console.log(clients);
            });
            this.server.of('/').adapter.allRooms( (err, rooms) => {
                console.log('allRooms');
                console.log(rooms);
            });
            console.log(err);
        });

        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }

    @SubscribeMessage('rooms')
    onEventRoomList(): Observable<WsResponse<string[]>> | void {
        let res = [];
        this.server.of('/').adapter.allRooms( (err, rooms) => {
                console.log('allRooms');
                console.log(rooms);
                res = rooms;
                this.server.emit('rooms', {data: res});
        });
        return null;
    }
}
