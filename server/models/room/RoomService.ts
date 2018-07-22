import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import { Room} from './RoomEntity';
import { CreateRoomFactory} from './factory/RoomFactory';
import {RoomDto} from './dto/RoomDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {RegisterRoomDto} from './dto/RegisterRoomDto';

@Injectable()
export class RoomService {

    constructor(@Inject('RoomRepositoryToken')
                private readonly roomRepository: Repository<Room>) {
    }

    async findAll(): Promise<ListResponseDto<RoomDto>> {
        const res = await this.roomRepository.findAndCount();
        const channels = res[0].map((channel) => channel.toDto());
        return new ListResponseDto<RoomDto>(channels, res[1]);
    }

    async findById(id: number): Promise<Room> {
        const room = await this.roomRepository.findOne(id);
        if (!room) {
            throw new NotFoundException(`Room is absent`);
        }
        return room;
    }
    async findByName(name: string): Promise<Room | undefined> {
        return await this.roomRepository.findOne({where: {name: name}});
    }

    async createRoom(registerRoomDto: RegisterRoomDto): Promise<RoomDto> {
        const createRoom = new CreateRoomFactory().create(registerRoomDto);
        const room: Room = await this.roomRepository.create(createRoom);
        const savedRoom: Room = await this.roomRepository.save<Room>(room);
        return savedRoom.toDto();
    }
}
