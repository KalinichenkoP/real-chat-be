
import { RegisterUserDto } from "../dto/RegisterUserDto";
import { CreateUserDto } from "../dto/CreateUserDto";
import {Factory} from "../../../interfaces/Factory";
import {HashUtil} from "../../../utils/HashUtil";

export class CreateUserFactory implements Factory<CreateUserDto> {
    create(registerDto: RegisterUserDto): CreateUserDto {
        const passHash = HashUtil.hashPass(registerDto.password);

        return new CreateUserDto(registerDto, passHash);
    }
}
