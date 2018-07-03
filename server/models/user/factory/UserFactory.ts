import { RegisterUserDto } from "../dto/RegisterUserDto";
import { CreateUserDto } from "../dto/CreateUserDto";
import {Factory} from "../../../interfaces/Factory";

export class CreateUserFactory implements Factory<CreateUserDto> {
    create(registerDto: RegisterUserDto): CreateUserDto {
        return new CreateUserDto(registerDto);
    }
}
