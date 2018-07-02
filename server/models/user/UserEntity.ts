import {PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Entity} from "typeorm/decorator/entity/Entity";
import {UserDto} from "./dto/UserDto";
import {Base} from "../base/BaseEntity";

@Entity()
export class User extends Base<User> {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column({name: "email"})
    email: string;

    toDto(): UserDto {
        return new UserDto(this);
    }

}
