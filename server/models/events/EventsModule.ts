import {Module} from '@nestjs/common';
import {EventsGateway} from './EventsGateway';

@Module({
    providers: [
        EventsGateway,
    ],
})
export class EventsModule {
}
