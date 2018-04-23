import {PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {Entity} from "typeorm/decorator/entity/Entity";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column({
        name: "is_active",
        type: "boolean"
    })
    isActive: boolean;

}
