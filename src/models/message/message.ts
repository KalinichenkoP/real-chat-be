import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity("mongodb")
export class Message {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}
