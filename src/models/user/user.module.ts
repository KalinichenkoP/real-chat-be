import {Module} from "@nestjs/common";
import {UserController} from './user.controller';
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        name: 'sql',
        host: 'localhost',
        port: 5432,
        database: 'test',
        entities: [User],
        synchronize: true})],
    controllers: [UserController],
    components: [UserService],
})
export class UserModule {
}
