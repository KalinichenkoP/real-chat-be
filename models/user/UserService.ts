import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {In, Repository} from 'typeorm';
import {User} from './UserEntity';
import {ListResponseDto} from "../../core/dto/ListResponseDto";
import {UserDto} from "./dto/UserDto";
import {RegisterUserDto} from './dto/RegisterUserDto';
import {CreateUserFactory} from './factory/UserFactory';
import {FindUsersDto} from './dto/FindUsersDto';
import {InjectConnection, InjectEntityManager} from "@nestjs/typeorm";
import { Connection } from 'typeorm';
@Injectable()
export class UserService {

    private userRepository: Repository<User>;
    constructor(@InjectEntityManager('postgres')
                private readonly userConnection: Connection) {
        this.userRepository = userConnection.getRepository<User>(User);
    }

    async findAll(query?: FindUsersDto): Promise<[User[], number]> {
        return await this.userRepository.findAndCount();
    }

    async findById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User is absent`);
        }
        return user.toDto()
    }

    async findByIds(ids: number[]): Promise<User[]> {
        return await this.userRepository.find({where: {id: In(ids)}});
    }

    async findByRoom(roomId: number): Promise<ListResponseDto<UserDto>> {
        const res = await this.userRepository.findAndCount({relations: ['rooms'],where: {roomId}});
        const users = res[0].map((user) => user.toDto());
        return new ListResponseDto<UserDto>(users, res[1]);
    }

    async findByEmail(email: string): Promise<User | undefined>  {
        return await this.userRepository.findOne({where: {email: email}});

    }

    async updateAccessToken(user: UserDto, token: string): Promise<UserDto> {
        // user.accessToken = token;
        // TO DO
        return user;
        // return await this.userRepository.save(user);
    }

    async createOne(registerUserDto: RegisterUserDto): Promise<User> {
        const createUser = new CreateUserFactory().create(registerUserDto);
        const createdUser: User =  await this.userRepository.create(createUser);
        return await this.userRepository.save(createdUser);
    }

}
