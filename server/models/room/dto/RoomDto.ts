
import { BaseDto } from "../../base/dto/BaseDto";
import {Room} from '../RoomEntity';

export class RoomDto extends BaseDto<Room> {

    readonly name: string;

    constructor(room: Room) {
        super(room);
        this.name = room.name;
    }
}
