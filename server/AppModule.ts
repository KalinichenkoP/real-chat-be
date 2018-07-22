import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/UserModule";
import {MessageModule} from "./models/message/MessageModule";
import {DatabaseModule} from "./database/DatabaseModule";
import {EventsModule} from './models/events/EventsModule';
import {RoomModule} from './models/room/RoomModule';
import {ConfigModule} from './models/config/ConfigModule';

@Module({
    imports:
        [
            UserModule,
            MessageModule,
            RoomModule,
            DatabaseModule,
            EventsModule,
            ConfigModule
        ]
})

export class ApplicationModule {
}
