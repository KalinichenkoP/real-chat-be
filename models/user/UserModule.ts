import {Module} from "@nestjs/common";
import {UserController} from '../../controllers/UserController';
import {UserService} from "./UserService";
import {DatabaseModule} from "../../database/DatabaseModule";
import {userProvider} from "./UserProvider";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, UserService],
    controllers: [UserController],
    exports: [UserModule]
})
export class UserModule {
}
