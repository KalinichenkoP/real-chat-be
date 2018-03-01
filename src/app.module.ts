import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageModule} from "./models/message/message.module";
import {UserModule} from "./models/user/user.module";

@Module({
    imports: [TypeOrmModule.forRoot(), MessageModule]
})
export class ApplicationModule {
}
