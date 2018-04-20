import {Component, HttpStatus, Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";

@Component()
export class UserService {

    constructor(@Inject('UserRepositoryToken')
                private readonly userRepository: Repository<User>) {
    }

    async find(): Promise<[User[], number]> {
        return await this.userRepository.findAndCount();
    }

    async findById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne(id);
    }
}
