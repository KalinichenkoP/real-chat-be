import {Component} from "@nestjs/common";
import {getRepository} from "typeorm";
import {User} from "../entity/user";

@Component()
export class UserService {

    async findAll(id: number): Promise<User[]> {
        const userRepository = getRepository<User>(User); // you can also get it via getConnection().getRepository() or getManager().getRepository()
        return await userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const userRepository = getRepository<User>(User); // you can also get it via getConnection().getRepository() or getManager().getRepository()
        return await userRepository.findOneById(id);
    }
}