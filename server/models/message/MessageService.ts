import { Inject, Injectable} from '@nestjs/common';
import {InsertOneWriteOpResult, MongoRepository} from 'typeorm';
import {Message} from './MessageEntity';
import {REPOSITORY_TOKEN} from '../../enums/RepositoryTokens';

@Injectable()
export class MessageService {

    constructor(@Inject(REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN)
                private readonly messageRepository: MongoRepository<Message>) {
    }

    public async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    public async createMessage(message: Message): Promise<any> {
        const result: InsertOneWriteOpResult =  await this.messageRepository.insertOne(message);
        console.log(result.result);
        console.log(result.ops[0]);
        console.log(result.insertedId);
        return result.ops[0];
    }

    public async findByUserId(userId: number): Promise<Message | undefined> {
        console.log(userId);
        this.messageRepository.findOne({where: {userId: userId}})
            .then(response => {
            console.log('response ' + response);
        }, error => {
                console.log('error ' + error);
        });
        return await this.messageRepository.findOne({where: {userId: userId}});
    }
}
