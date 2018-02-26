import {Component} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "../entity/user";
import {InjectRepository} from "@nestjs/typeorm";

@Component()
export class UserService {

    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>,) {
    }

    public async findAll(id: number): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findById(id: number): Promise<User> {
        return await this.userRepository.findOneById(id);
    }
}