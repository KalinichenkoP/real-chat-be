import {RegisterRoomDto} from './RegisterRoomDto';

export class CreateRoomDto {
    readonly roomName: string;

    constructor(registerDto: RegisterRoomDto) {
        this.roomName = registerDto.roomName;

    }
}
