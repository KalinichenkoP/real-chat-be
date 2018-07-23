import { ObjectIdColumn, Column} from "typeorm";
import {Entity} from "typeorm/decorator/entity/Entity";
import {ObjectID} from "typeorm/driver/mongodb/typings";
import {MessageDto} from './dto/MessageDto';
import {UserDto} from '../user/dto/UserDto';

@Entity()
export class Message {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    senderId: number;

    @Column()
    uuid: string;

    @Column()
    text: string;

    @Column()
    roomId: number;

    toDto(): MessageDto {
        return new MessageDto(this);
    }
}
