import {Component} from "@nestjs/common";
import {Repository} from "typeorm";
import {Message} from "../entity/message";
import {InjectRepository} from "@nestjs/typeorm";

@Component()
export class MessageService {

    constructor(@InjectRepository(Message)
                private readonly messageRepository: Repository<Message>,) {
    }

    public async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    public async findById(id: number): Promise<Message> {
        return await this.messageRepository.findOneById(id);
    }
}