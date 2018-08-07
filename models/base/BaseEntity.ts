import {BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";


export abstract class Base<T> extends BaseEntity{
    @CreateDateColumn({
        name: "created_at",
        type: "timestamp"
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp"
    })
    updatedAt: Date;
}
