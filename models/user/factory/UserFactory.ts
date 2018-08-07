import { RegisterUserDto } from "../dto/RegisterUserDto";
import { CreateUserDto } from "../dto/CreateUserDto";
import {IFactory} from "../../../interfaces/IFactory";

export class CreateUserFactory implements IFactory<CreateUserDto> {
    create(registerDto: RegisterUserDto): CreateUserDto {
        return new CreateUserDto(registerDto);
    }
}
