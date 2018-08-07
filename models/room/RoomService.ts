import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import { Room} from './RoomEntity';
import { CreateRoomFactory} from './factory/RoomFactory';
import {RoomDto} from './dto/RoomDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {RegisterRoomDto} from './dto/RegisterRoomDto';
import {User} from '../user/UserEntity';

@Injectable()
export class RoomService {

    constructor(@Inject('RoomRepositoryToken')
                private readonly roomRepository: Repository<Room>) {
    }

    async findAll(): Promise<[Room[], number]> {
        return await this.roomRepository.findAndCount();
    }

    async findById(id: number): Promise<Room> {
        const room = await this.roomRepository.findOne(id);
        if (!room) {
            throw new NotFoundException(`Room is absent`);
        }
        return room;
    }
    async findByName(name: string): Promise<Room | undefined> {
        return await this.roomRepository.findOne({where: {roomName: name}});
    }

    async createRoom(registerRoomDto: RegisterRoomDto): Promise<Room> {
        const createRoom = new CreateRoomFactory().create(registerRoomDto);
        const room: Room = await this.roomRepository.create(createRoom);
        return await this.roomRepository.save<Room>(room);
    }

    async addUsers(room: Room, users: User[]): Promise<Room> {
        room.users = users;
        return this.roomRepository.save(room);
    }
}
