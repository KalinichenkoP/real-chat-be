import {Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {ChannelService} from "./ChannelService";
import {ChannelDto} from './dto/ChannelDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';

@Controller('channels')
export class ChannelController {


    constructor(private readonly channelService: ChannelService) {
    }

    @Get()
    async findAll(): Promise<ListResponseDto<ChannelDto>> {
        return await this.channelService.findAll();
    }

    @Post()
    async create(@Req() req, @Res() res): Promise<ChannelDto> {
        console.log(req.body);
        const channel = await this.channelService.createOne(req.body);
        return res.send(channel);
    }

    @Get(':id')
    async findOne(@Res() res, @Param("id") id): Promise<ChannelDto> {
        const channel: ChannelDto = await this.channelService.findById(id);

        return res.json(channel);
    }
}
