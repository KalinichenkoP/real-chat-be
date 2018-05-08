import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database/DatabaseModule";
import {SessionService} from "./SessionService";
import {SessionController} from "./SessionController";
import {sessionProvider} from "./SessionProvider";

@Module({
    imports: [DatabaseModule],
    components: [...sessionProvider, SessionService],
    controllers: [SessionController],
    exports: [SessionModule]
})
export class SessionModule {
}
