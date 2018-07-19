import {Inject, Injectable} from '@nestjs/common';
import {InsertOneWriteOpResult, MongoRepository} from 'typeorm';
import {Message} from './MessageEntity';
import {REPOSITORY_TOKEN} from '../../enums/RepositoryTokens';
import {CreateMessageDto} from './dto/CreateMessageDto';
import {MessageDto} from './dto/MessageDto';

@Injectable()
export class MessageService {

    constructor(@Inject(REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN)
                private readonly messageRepository: MongoRepository<Message>) {
    }

    public async findAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    public async createMessage(messageDto: MessageDto): Promise<Message> {
        const message = new Message();
        message.userId = messageDto.senderId;
        message.chatRoom = messageDto.chatRoom;
        message.text = messageDto.text;
        const result: Message = await this.messageRepository.save<Message>(message);
        console.log(result);
        return result;
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
