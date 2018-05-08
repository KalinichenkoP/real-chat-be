import {Component,  Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {Channel} from "./ChannelEntity";

@Component()
export class ChannelService {

    constructor(@Inject('UserRepositoryToken')
                private readonly userRepository: Repository<Channel>) {
    }

    async find(): Promise<[Channel[], number]> {
        return await this.userRepository.findAndCount();
    }

    async findById(id: number): Promise<Channel | undefined> {
        return await this.userRepository.findOne(id);
    }
}
