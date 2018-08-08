import {Module} from "@nestjs/common";
// import {SessionController} from './../../controllers/SessionController';
import {SessionService} from "./SessionService";

@Module({
    providers: [SessionService],
    // controllers: [SessionController],
    exports: [SessionModule]
})
export class SessionModule {
}
