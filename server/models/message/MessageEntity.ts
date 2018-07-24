import {ObjectIdColumn, Column, Index, CreateDateColumn} from 'typeorm';
import {Entity} from "typeorm/decorator/entity/Entity";
import {ObjectID} from "typeorm/driver/mongodb/typings";
import {MessageDto} from './dto/MessageDto';

@Entity()
export class Message {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    senderId: number;

    @Column()
    @Index({ unique: true })
    uuid: string;

    @Column()
    text: string;

    @Column()
    roomId: number;

    @CreateDateColumn()
    createdAt: Date;

    toDto(): MessageDto {
        return new MessageDto(this);
    }
}
