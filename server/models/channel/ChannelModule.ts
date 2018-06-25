import {Module} from "@nestjs/common";
import {ChannelController} from './ChannelController';
import {ChannelService} from "./ChannelService";
import {DatabaseModule} from "../../database/DatabaseModule";
import {channelProvider} from "./ChannelProvider";

@Module({
    imports: [DatabaseModule],
    components: [...channelProvider, ChannelService],
    controllers: [ChannelController],
    exports: [ChannelModule]
})
export class ChannelModule {
}
