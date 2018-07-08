import {PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import {Entity} from "typeorm/decorator/entity/Entity";
import {Base} from "../base/BaseEntity";
import {User} from '../user/UserEntity';

@Entity({name: 'channels'})
export class Channel extends Base<Channel>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}
