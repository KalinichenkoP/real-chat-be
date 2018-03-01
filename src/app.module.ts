import {Module} from '@nestjs/common';
import {MessageModule} from "./models/message/message.module";
import {UserModule} from "./models/user/user.module";

@Module({
    imports: [UserModule, MessageModule]
})
export class ApplicationModule {
}
