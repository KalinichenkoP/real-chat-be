import { RegisterUserDto } from "./RegisterUserDto";

export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly image: string;

    constructor(registerDto: RegisterUserDto) {
        this.firstName = registerDto.firstName;
        this.lastName = registerDto.lastName;
        this.email = registerDto.email;
        this.image = registerDto.image;

    }
}
