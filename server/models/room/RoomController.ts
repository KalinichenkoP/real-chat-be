import {Body, Controller, Get, NotFoundException, Param, Post, Req, Res, UsePipes} from '@nestjs/common';
import {RoomService} from "./RoomService";
import {RoomDto} from './dto/RoomDto';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {Room} from './RoomEntity';
import { CreateRoomSchema} from '../../core/schemas/CreateChannelSchema';
import {JoiValidationPipe} from '../../core/pipes/JoiValidationPipe';
import {CreateRoomDto} from './dto/CreateRoomDto';

@Controller('rooms')
export class RoomController {


    constructor(private readonly roomService: RoomService) {
    }

    @Get()
    async findAll(): Promise<ListResponseDto<RoomDto>> {
        return await this.roomService.findAll();
    }

    @Post()
    @UsePipes(new JoiValidationPipe<CreateRoomDto>(new CreateRoomSchema()))
    async create(@Body() body: CreateRoomDto, @Res() res): Promise<RoomDto> {
        //check for exist
        const testRoom = await this.roomService.findByName(body.roomName);
        if (testRoom) {
            throw new NotFoundException(`Room with the selected name already exist`);
        }
        const room: RoomDto = await this.roomService.createRoom(body);
        return res.send(room);
    }

    @Get(':id')
    async findOne(@Res() res, @Param("id") id): Promise<RoomDto> {
        const room: Room = await this.roomService.findById(id);
        return res.json(room.toDto());
    }
}
