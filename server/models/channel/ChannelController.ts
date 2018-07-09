import {Controller, Get, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {ChannelService} from "./ChannelService";
import {Channel} from "./ChannelEntity";
import {ChannelDto} from './dto/ChannelDto';

@Controller('api/v1/channels')
export class ChannelController {


    constructor(private readonly channelService: ChannelService) {
    }

    @Get()
    async findAll(): Promise<[Channel[], number]> {
        return await this.channelService.findAll();
    }

    @Post()
    async create(@Req() req, @Res() res): Promise<ChannelDto> {
        return await this.channelService.create(req.body);
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
