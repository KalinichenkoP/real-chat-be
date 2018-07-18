
import { Module } from '@nestjs/common';
import { EventsGateway } from './EventsGateway';
import {MessageService} from '../message/MessageService';

@Module({
    providers: [
        MessageService,
        EventsGateway
    ],
})
export class EventsModule {}
