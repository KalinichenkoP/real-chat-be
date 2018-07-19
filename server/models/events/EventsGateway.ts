import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as redisAdapter from 'socket.io-redis';
import {MessageService} from '../message/MessageService';
import {MessageDto} from '../message/dto/MessageDto';
import {Message} from '../../../real-chat-app/src/app/models/message';
import {CreateMessageDto} from '../message/dto/CreateMessageDto';
import {CreateMessageSchema} from '../../core/schemas/CreateMessageSchema';
import {UsePipes} from '@nestjs/common';
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';

@WebSocketGateway(3001, {adapter: redisAdapter({host: 'localhost', port: 6379})})
export class EventsGateway {
    @WebSocketServer() server;

    constructor(private readonly messageService: MessageService) {
    }

    // @UsePipes(new JoiValidationPipe<CreateMessageDto>(new CreateMessageSchema()))
    @SubscribeMessage('message')
    onEventConnect(client, message: MessageDto): Observable<WsResponse<number>> {
        console.log(message);
        this.messageService.createMessage(message)
            .then(result => {
                    this.server.of('/').adapter.clientRooms(message.chatRoom, (err, clientRooms) => {
                        this.server.to(message.chatRoom).emit('message', message);
                        console.log('clientRooms');
                        console.log(clientRooms);
                    });
                },
                error => {
                    console.log(error);
                });
        const event = 'events';
        const response = [1, 2, 3];

        return from(response).pipe(map(res => ({event, data: res})));
    }
}
