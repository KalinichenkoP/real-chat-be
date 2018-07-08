import {Component,  Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {Channel} from "./ChannelEntity";

@Component()
export class ChannelService {

    constructor(@Inject('ChannelRepositoryToken')
                private readonly channelRepository: Repository<Channel>) {
    }

    async findAll(): Promise<[Channel[], number]> {
        return await this.channelRepository.findAndCount();
    }

    async findById(id: number): Promise<Channel | undefined> {
        return await this.channelRepository.findOne(id);
    }
}
