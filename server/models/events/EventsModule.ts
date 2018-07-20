import {Module} from '@nestjs/common';
import {EventsGateway} from './EventsGateway';
import {MessageService} from '../message/MessageService';
import {messageProvider} from '../message/MessageProvider';
import {DatabaseModule} from '../../database/DatabaseModule';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        ...messageProvider,
        MessageService,
        EventsGateway,
    ],
})
export class EventsModule {
}
