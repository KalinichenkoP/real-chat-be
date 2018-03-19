import {Component} from "@nestjs/common";
import {MongoRepository} from "typeorm";
import {Message} from "./message.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Component()
export class MessageService {

    constructor(@InjectRepository(Message)
                private readonly messageRepository: MongoRepository<Message>) {
    }

    public async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    public async findById(id: number): Promise<Message> {
        return await this.messageRepository.findOneById(id);
    }
}
