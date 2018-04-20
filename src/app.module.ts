import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/user.module";
import {MessageModule} from "./models/message/message.module";
import {DatabaseModule} from "./models/database/database.module";

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
