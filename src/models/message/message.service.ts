import {Component, Inject} from "@nestjs/common";
import {MongoRepository} from "typeorm";
import {Message} from "./message.entity";
import {REPOSITORY_TOKEN} from "../../constants/repository.tokens";

@Component()
export class MessageService {

    constructor(@Inject(REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN)
                private readonly messageRepository: MongoRepository<Message>) {
    }

    public async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    // public async findById(id: number): Promise<Message> {
    //     return await this.messageRepository.findOne(id);
    // }
}
