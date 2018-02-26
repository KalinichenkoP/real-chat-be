import { Module } from "@nestjs/common";
import { UserController } from '../controller/user.controller';
import {UserService} from "../service/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entity/user";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    components: [UserService],
})
export class UserModule {}
