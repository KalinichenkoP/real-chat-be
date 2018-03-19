import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/user.module";
import {MessageModule} from "./models/message/message.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user/user.entity";
import {Message} from "./models/message/message.entity";

@Module({
    imports:
        [
            UserModule,
            MessageModule,
        ]
})

export class ApplicationModule {
}
