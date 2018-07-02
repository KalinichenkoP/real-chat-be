import {PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn} from "typeorm";
import {Entity} from "typeorm/decorator/entity/Entity";
import {Base} from "../base/BaseEntity";

@Entity()
export class Channel extends Base<Channel>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    name: string;
}
