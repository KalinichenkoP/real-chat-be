import {Component, Inject} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./UserEntity";
import {ListResponseDto} from "../../core/dto/ListResponseDto";


@Component()
export class SessionService {

    constructor(@Inject('UserRepositoryToken')
                private readonly userRepository: Repository<User>) {
    }

    async find(): Promise<ListResponseDto<UserDto>> {
        const res = await this.userRepository.findAndCount();
        const users = res[0].map((user) => user.toDto());
        return new ListResponseDto<UserDto>(users, res[1]);
    }

    async findById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne(id);
    }
}
