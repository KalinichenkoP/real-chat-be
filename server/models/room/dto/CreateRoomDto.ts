import {RegisterRoomDto} from './RegisterRoomDto';

export class CreateRoomDto {
    readonly name: string;

    constructor(registerDto: RegisterRoomDto) {
        this.name = registerDto.name;

    }
}
