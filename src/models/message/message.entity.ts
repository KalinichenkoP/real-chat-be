import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity()
export class Message {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}
