import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {Channel} from "./ChannelEntity";
import {CreateChannelFactory} from './factory/ChannelFactory';
import {ChannelDto} from './dto/ChannelDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {RegisterChannelDto} from './dto/RegisterChannelDto';

@Injectable()
export class ChannelService {

    constructor(@Inject('ChannelRepositoryToken')
                private readonly channelRepository: Repository<Channel>) {
    }

    async findAll(): Promise<ListResponseDto<ChannelDto>> {
        const res = await this.channelRepository.findAndCount();
        const channels = res[0].map((channel) => channel.toDto());
        return new ListResponseDto<ChannelDto>(channels, res[1]);
    }

    async findById(id: number): Promise<Channel> {
        const channel = await this.channelRepository.findOne(id);
        if (!channel) {
            throw new NotFoundException(`Channel is absent`);
        }
        return channel;
    }
    async findByName(name: string): Promise<Channel | undefined> {
        return await this.channelRepository.findOne({where: {name: name}});
    }

    async createRoom(registerChannelDto: RegisterChannelDto): Promise<ChannelDto> {
        const createChannel = new CreateChannelFactory().create(registerChannelDto);
        const channel: Channel = await this.channelRepository.create(createChannel);
        const savedChannel: Channel = await this.channelRepository.save<Channel>(channel);
        return savedChannel.toDto();
    }
}
