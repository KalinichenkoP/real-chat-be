import {Component,  Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {Channel} from "./ChannelEntity";
import {CreateChannelFactory} from './factory/ChannelFactory';
import {ChannelDto} from './dto/ChannelDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';

@Component()
export class ChannelService {

    constructor(@Inject('ChannelRepositoryToken')
                private readonly channelRepository: Repository<Channel>) {
    }

    async findAll(): Promise<ListResponseDto<ChannelDto>> {
        const res = await this.channelRepository.findAndCount();
        const channels = res[0].map((channel) => channel.toDto());
        return new ListResponseDto<ChannelDto>(channels, res[1]);
    }

    async findById(id: number): Promise<Channel | undefined> {
        return await this.channelRepository.findOne(id);
    }

    async create(registerChannelDto): Promise<ChannelDto> {
        const createChannel = new CreateChannelFactory().create(registerChannelDto);
        const channel = await this.channelRepository.create(createChannel);
        return channel.toDto();
    }
}
