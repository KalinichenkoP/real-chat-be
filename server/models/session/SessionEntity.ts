import {User} from "../user/UserEntity";
import {Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Base} from "../base/BaseEntity";


export class Session extends Base<Session> {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "refresh_token" })
    refreshToken: string;


    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}