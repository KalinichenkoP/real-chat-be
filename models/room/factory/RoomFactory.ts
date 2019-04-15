import {IFactory} from '../../../interfaces/IFactory';
import {CreateRoomDto} from '../dto/CreateRoomDto';
import {RegisterRoomDto} from '../dto/RegisterRoomDto';

export class CreateRoomFactory implements IFactory<CreateRoomDto> {
    create(registerChannelDto: RegisterRoomDto): CreateRoomDto {
        return new CreateRoomDto(registerChannelDto);
    }
}
