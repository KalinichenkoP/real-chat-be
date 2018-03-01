import {Component, Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Component()
export class UserService {

    constructor(@Inject('userRepositoryToken')
                private readonly userRepository: Repository<User>) {
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findById(id: number): Promise<User> {
        return await this.userRepository.findOneById(id);
    }
}
