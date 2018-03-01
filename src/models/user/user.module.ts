import { Module } from "@nestjs/common";
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {userProviders} from "./userProviders";
import {DatabaseModule} from "../../util/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    components: [...userProviders, UserService, ],
})
export class UserModule {}
