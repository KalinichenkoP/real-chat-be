import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/UserModule";
import {MessageModule} from "./models/message/MessageModule";
import {DatabaseModule} from "./database/DatabaseModule";

@Module({
    imports:
        [
            UserModule,
            MessageModule,
            DatabaseModule
        ]
})

export class ApplicationModule {
}
