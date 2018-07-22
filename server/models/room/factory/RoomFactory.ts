import {Factory} from '../../../interfaces/Factory';
import {CreateRoomDto} from '../dto/CreateRoomDto';
import {RegisterRoomDto} from '../dto/RegisterRoomDto';

export class CreateRoomFactory implements Factory<CreateRoomDto> {
    create(registerChannelDto: RegisterRoomDto): CreateRoomDto {
        return new CreateRoomDto(registerChannelDto);
    }
}
