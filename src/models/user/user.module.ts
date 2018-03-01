import { Module } from "@nestjs/common";
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user";


const userProvider = { provide: 'UserRepository', useValue: User};

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    components: [UserService, userProvider]
})
export class UserModule {}
