import {Module} from "@nestjs/common";
import {RoomController} from './RoomController';
import {RoomService} from "./RoomService";
import {DatabaseModule} from "../../database/DatabaseModule";
import {roomProvider} from "./RoomProvider";

@Module({
    imports: [DatabaseModule],
    providers: [...roomProvider, RoomService],
    controllers: [RoomController],
    exports: [RoomModule]
})
export class RoomModule {
}
