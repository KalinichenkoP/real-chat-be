import {PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import {Entity} from "typeorm/decorator/entity/Entity";
import {Base} from "../base/BaseEntity";
import {User} from '../user/UserEntity';
import {ChannelDto} from './dto/ChannelDto';

@Entity({name: 'channels'})
export class Channel extends Base<Channel>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name", unique: true})
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    toDto(): ChannelDto {
        return new ChannelDto(this);
    }
}
