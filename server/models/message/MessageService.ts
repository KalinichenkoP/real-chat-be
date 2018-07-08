import {Component, Inject} from '@nestjs/common';
import {MongoRepository} from 'typeorm';
import {Message} from './MessageEntity';
import {REPOSITORY_TOKEN} from '../../enums/RepositoryTokens';

@Component()
export class MessageService {

    constructor(@Inject(REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN)
                private readonly messageRepository: MongoRepository<Message>) {
    }

    public async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    public async findByUser(userId: number): Promise<Message | undefined> {
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
