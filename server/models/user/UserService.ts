import {Component, Inject, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from './UserEntity';
import {ListResponseDto} from "../../core/dto/ListResponseDto";
import {UserDto} from "./dto/UserDto";
import {RegisterUserDto} from './dto/RegisterUserDto';
import {CreateUserFactory} from './factory/UserFactory';

@Component()
export class UserService {

    constructor(@Inject('UserRepositoryToken')
                private readonly userRepository: Repository<User>) {
    }

    async findAll(): Promise<ListResponseDto<UserDto>> {
        const res = await this.userRepository.findAndCount();
        const users = res[0].map((user) => user.toDto());
        return new ListResponseDto<UserDto>(users, res[1]);
    }

    async findById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User is absent`);
        }
        return user.toDto()
    }

    async findByEmail(email: string): Promise<UserDto> {
        const user:User =  await this.userRepository.findOne({where: {email: email}});
        if (!user) {
            throw new NotFoundException(`User is absent`);
        }
        return user.toDto();
    }

    async updateAccessToken(user: UserDto, token: string): Promise<UserDto> {
        // user.accessToken = token;
        // TO DO
        return user;
        // return await this.userRepository.save(user);
    }

    async createOne(registerUserDto: RegisterUserDto): Promise<UserDto> {
        const createUser = new CreateUserFactory().create(registerUserDto);
        const  user: User = await this.userRepository.create(createUser);
        return user.toDto();
    }

}
