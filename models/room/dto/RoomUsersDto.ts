import { BaseDto } from "../../base/dto/BaseDto";
import {Room} from '../RoomEntity';
import {UserDto} from '../../user/dto/UserDto';

export class RoomUsersDto extends BaseDto<Room> {

    readonly roomName: string;
    readonly id: number;
    readonly users: UserDto[];

    constructor(room: Room) {
        console.log(room);
        super(room);
        this.roomName = room.roomName;
        this.id = room.id;
        this.users = room.users ? room.users.map(user=> user.toDto()) : []
    }
}
