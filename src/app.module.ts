import {Module} from '@nestjs/common';
import {UserModule} from "./models/user/user.module";
import {MessageModule} from "./models/message/message.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user/user.entity";
import {Message} from "./models/message/message.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            name: 'sql',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [User],
            synchronize: true
        }),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            name: 'nosql',
            host: 'localhost',
            port: 27017,
            database: 'test',
            entities: [Message],
            synchronize: true
        }),
        UserModule,
        MessageModule]
})

export class ApplicationModule {
}
