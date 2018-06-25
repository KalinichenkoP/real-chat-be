import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/UserModule";
import {MessageModule} from "./models/message/MessageModule";
import {DatabaseModule} from "./database/DatabaseModule";
import {ChannelModule} from "./models/channel/ChannelModule";

@Module({
    imports:
        [
            UserModule,
            ChannelModule,
            MessageModule,
            DatabaseModule
        ]
})

export class ApplicationModule {
}
