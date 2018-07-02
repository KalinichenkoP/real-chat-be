import {Controller, Get,  NotFoundException, Param, Res} from "@nestjs/common";
import {ChannelService} from "./ChannelService";
import {Channel} from "./ChannelEntity";

@Controller('channel')
export class ChannelController {


    constructor(private readonly channelService: ChannelService) {
    }

    @Get()
    async findAll(): Promise<[Channel[], number]> {
        return await this.channelService.find();
    }

    @Get(':id')
    async findOne(@Res() res, @Param("id") id) {
        const channel = await this.channelService.findById(id);

        if (!channel) {
            throw new NotFoundException(`User is absent`);
        }

        res.json(channel);
    }
}
