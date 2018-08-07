import {Module} from "@nestjs/common";
import {UserController} from '../../controllers/UserController';
import {UserService} from "./UserService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./UserEntity";

@Module({
    imports: [TypeOrmModule.forFeature([User], 'postgres')],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserModule]
})
export class UserModule {
}
