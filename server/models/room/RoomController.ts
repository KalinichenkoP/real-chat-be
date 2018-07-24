import {Body, Controller, Get, NotFoundException, Param, Post, Put, Res, UsePipes} from '@nestjs/common';
import {RoomService} from './RoomService';
import {RoomDto} from './dto/RoomDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {Room} from './RoomEntity';
import {CreateRoomSchema} from '../../core/schemas/CreateChannelSchema';
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';
import {CreateRoomDto} from './dto/CreateRoomDto';
import {UserService} from '../user/UserService';
import {User} from '../user/UserEntity';
import {RoomUsersDto} from './dto/RoomUsersDto';
import {AddUsersRoomDto} from './dto/AddUsersRoomDto';

@Controller('rooms')
export class RoomController {


    constructor(private readonly roomService: RoomService, private readonly userService: UserService) {
    }

    @Get()
    async findAll(): Promise<ListResponseDto<RoomDto>> {
        const res = await this.roomService.findAll();
        const rooms = res[0].map((room) => room.toDto());
        return new ListResponseDto<RoomDto>(rooms, res[1]);
    }

    @Post()
    @UsePipes(new JoiValidationPipe<CreateRoomDto>(new CreateRoomSchema()))
    async create(@Body() body: CreateRoomDto, @Res() res): Promise<RoomDto> {
        //check for exist
        const testRoom = await this.roomService.findByName(body.roomName);
        if (testRoom) {
            throw new NotFoundException(`Room with the selected name already exist`);
        }
        const room: Room = await this.roomService.createRoom(body);
        return res.send(room);
    }

    @Put()
    // @UsePipes(new JoiValidationPipe<AddUsersRoom>(new AddUsersRoomSchema()))
    async addUsers(@Body() body: AddUsersRoomDto, @Res() res): Promise<RoomUsersDto> {
        //check for exist
        const room: Room = await this.roomService.findById(body.roomId);
        if (room) {
            throw new NotFoundException(`Room with the selected name is absent`);
        }
        const connectedUsers: User[] = await this.userService.findByIds(body.usersIds);
        const updatedRoom: Room = await this.roomService.addUsers(room, connectedUsers);
        return res.send(updatedRoom);
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<RoomDto> {
        const room: Room = await this.roomService.findById(id);
        return res.json(room.toDto());
    }
}
