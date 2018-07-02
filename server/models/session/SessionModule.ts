import {Module} from "@nestjs/common";
import {SessionController} from './SessionController';
import {SessionService} from "./SessionService";
import {DatabaseModule} from "../../database/DatabaseModule";
import {sessionProvider} from "./SessionProvider";

@Module({
    imports: [DatabaseModule],
    components: [...sessionProvider, SessionService],
    controllers: [SessionController],
    exports: [SessionModule]
})
export class SessionModule {
}
