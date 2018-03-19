import { ObjectIdColumn, Column} from "typeorm";
import {Entity} from "typeorm/decorator/entity/Entity";
import {ObjectID} from "typeorm/driver/mongodb/typings";

@Entity()
export class Message {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}
