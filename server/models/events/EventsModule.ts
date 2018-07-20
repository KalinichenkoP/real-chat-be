import {Module} from '@nestjs/common';
import {EventsGateway} from './EventsGateway';
import {MessageService} from '../message/MessageService';
import {messageProvider} from '../message/MessageProvider';
import {DatabaseModule} from '../../database/DatabaseModule';
import {ChannelService} from '../channel/ChannelService';
import {channelProvider} from '../channel/ChannelProvider';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        ...messageProvider,
        MessageService,
        ...channelProvider,
        ChannelService,
        EventsGateway,
    ],
})
export class EventsModule {
}
