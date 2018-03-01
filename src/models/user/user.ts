import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("postgres")
export class User {

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
