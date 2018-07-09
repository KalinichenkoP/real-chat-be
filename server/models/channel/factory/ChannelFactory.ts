import {Factory} from '../../../interfaces/Factory';
import {CreateChannelDto} from '../dto/CreateChannelDto';
import {RegisterChannelDto} from '../dto/RegisterChannelDto';

export class CreateChannelFactory implements Factory<CreateChannelDto> {
    create(registerChannelDto: RegisterChannelDto): CreateChannelDto {
        return new CreateChannelDto(registerChannelDto);
    }
}
