import {Inject, Injectable} from '@nestjs/common';
import {InsertOneWriteOpResult, MongoRepository, ObjectID, UpdateWriteOpResult} from 'typeorm';
import {Message} from './MessageEntity';
import {REPOSITORY_TOKEN} from '../../enums/RepositoryTokens';
import {CreateMessageDto} from './dto/CreateMessageDto';
import {MessageDto} from './dto/MessageDto';
import {FindUsersDto} from '../user/dto/FindUsersDto';
import {FindMessagesDto} from './dto/FindMessagesDto';

@Injectable()
export class MessageService {

    constructor(@Inject(REPOSITORY_TOKEN.MESSAGE_REPOSITORY_TOKEN)
                private readonly messageRepository: MongoRepository<Message>) {
    }

    public async findAll(query: FindMessagesDto): Promise<Message[]> {
        return await this.messageRepository.find({skip: query.offset, take: query.limit});
    }

    public async findByRoomId(roomId: number): Promise<Message[]> {
        return await this.messageRepository.find({'roomId': roomId});
    }

    public async createMessage(messageDto: CreateMessageDto): Promise<Message> {
        const message = new Message();
        message.uuid = messageDto.uuid;
        message.senderId = messageDto.senderId;
        message.roomId = messageDto.roomId;
        message.text = messageDto.text;
        message.createdAt = messageDto.createdAt;
        message.readAmount = 0;
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

    public async updateReadAmount(messageUUID: string): Promise<UpdateWriteOpResult> {
        return await this.messageRepository.updateOne({uuid: messageUUID}, {$inc: {readAmount: 1}})
    }
}
