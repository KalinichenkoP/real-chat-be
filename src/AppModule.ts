import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/UserModule";
import {MessageModule} from "./models/message/MessageModule";
import {DatabaseModule} from "./database/DatabaseModule";
import {SessionModule} from "./models/session/SessionModule";

@Module({
    imports:
        [
            UserModule,
            MessageModule,
            SessionModule,
            DatabaseModule
        ]
})

export class ApplicationModule {
}
