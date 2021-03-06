import {PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {UserDto} from './dto/UserDto';
import {Base} from '../base/BaseEntity';
import {Room} from '../room/RoomEntity';

@Entity({name: 'users'})
export class User extends Base<User> {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'image'})
    image: string;

    @Column({name: 'access_token'})
    accessToken: string;

    toDto(): UserDto {
        return new UserDto(this);
    }

    @ManyToMany(type => Room, room => room.users)
    rooms: Room[];


}
