import {Body, Controller, Get, NotFoundException, Param, Post, Req, Res, UsePipes} from '@nestjs/common';
import {ChannelService} from "./ChannelService";
import {ChannelDto} from './dto/ChannelDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {Channel} from './ChannelEntity';
import {CreateChannelSchema} from '../../core/schemas/CreateChannelSchema';
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';
import {CreateChannelDto} from './dto/CreateChannelDto';

@Controller('channels')
export class ChannelController {


    constructor(private readonly channelService: ChannelService) {
    }

    @Get()
    async findAll(): Promise<ListResponseDto<ChannelDto>> {
        return await this.channelService.findAll();
    }

    @Post()
    @UsePipes(new JoiValidationPipe<CreateChannelDto>(new CreateChannelSchema()))
    async create(@Body() body: CreateChannelDto, @Res() res): Promise<ChannelDto> {
        console.log(body.name);
        //check for exist
        const testChannel = await this.channelService.findByName(body.name);
        if (testChannel) {
            throw new NotFoundException(`Chat with the selected name already exist`);
        }
        const channel = await this.channelService.createOne(body);
        return res.send(channel);
    }

    @Get(':id')
    async findOne(@Res() res, @Param("id") id): Promise<ChannelDto> {
        const channel: Channel = await this.channelService.findById(id);

        return res.json(channel.toDto());
    }
}
