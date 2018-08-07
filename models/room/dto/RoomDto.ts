
import { BaseDto } from "../../base/dto/BaseDto";
import {Room} from '../RoomEntity';

export class RoomDto extends BaseDto<Room> {

    readonly roomName: string;
    readonly id: number;

    constructor(room: Room) {
        super(room);
        this.roomName = room.roomName;
        this.id = room.id;
    }
}
