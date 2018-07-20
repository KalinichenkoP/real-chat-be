import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/UserModule";
import {MessageModule} from "./models/message/MessageModule";
import {DatabaseModule} from "./database/DatabaseModule";
import {EventsModule} from './models/events/EventsModule';

@Module({
    imports:
        [
            UserModule,
            MessageModule,
            DatabaseModule,
            EventsModule,
        ]
})

export class ApplicationModule {
}
