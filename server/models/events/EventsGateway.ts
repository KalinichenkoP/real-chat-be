import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as redisAdapter from 'socket.io-redis';

import {MessageService} from '../message/MessageService';
import {MessageDto} from '../message/dto/MessageDto';
import {CreateMessageSchema} from '../../core/schemas/CreateMessageSchema';
import {CreateMessageDto} from '../message/dto/CreateMessageDto';
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';
import {UsePipes} from '@nestjs/common';

@WebSocketGateway(4000, {adapter: redisAdapter({host: 'localhost', port: 6379})})
export class EventsGateway {
    @WebSocketServer() server;

    constructor(private readonly messageService: MessageService) {
    }

    // @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    // @SubscribeMessage('message')
    // onEventConnect(client, message: MessageDto): Observable<WsResponse<number>> {
    //     this.messageService.createMessage(message)
    //         .then(result => {
    //             console.log('result');
    //             console.log(result);
    //                 this.server.to(message.roomId.toString()).emit('message', message);
    //             },
    //             error => {
    //                 console.log('error');
    //                 console.log(error);
    //             });
    //     const event = 'events';
    //     const response = [1, 2, 3];
    //
    //     return from(response).pipe(map(res => ({event, data: res})));
    // }

    @SubscribeMessage('connectRoom')
    onEventConnectRoom(client, roomId: number): Observable<WsResponse<number>> {
        this.server.of('/').adapter.remoteJoin(client.id, roomId.toString(), (err) => {
            console.log(err);
        });

        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }
}
