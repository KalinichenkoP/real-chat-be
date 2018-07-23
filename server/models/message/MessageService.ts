import {Inject, Injectable} from '@nestjs/common';
import {InsertOneWriteOpResult, MongoRepository, ObjectID} from 'typeorm';
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

    public async findByRoomId(roomId: string): Promise<Message[]> {
        return await this.messageRepository.find({'roomId': parseInt(roomId,10)});
    }

    public async createMessage(messageDto: MessageDto): Promise<Message> {
        const message = new Message();
        message.uuid = messageDto.uuid;
        message.senderId = messageDto.senderId;
        message.roomId = messageDto.roomId;
        message.text = messageDto.text;
        return await this.messageRepository.save<Message>(message);
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
