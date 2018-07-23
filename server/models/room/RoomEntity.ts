import {PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import {Entity} from "typeorm/decorator/entity/Entity";
import {Base} from "../base/BaseEntity";
import {User} from '../user/UserEntity';
import {RoomDto} from './dto/RoomDto';

@Entity({name: 'rooms'})
export class Room extends Base<Room>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name", unique: true})
    roomName: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    toDto(): RoomDto {
        return new RoomDto(this);
    }
}
