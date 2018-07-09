import {RegisterChannelDto} from './RegisterChannelDto';

export class CreateChannelDto {
    readonly name: string;

    constructor(registerDto: RegisterChannelDto) {
        this.name = registerDto.name;

    }
}
