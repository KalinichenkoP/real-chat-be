import { RegisterUserDto } from "./RegisterUserDto";

export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly image: string;

    constructor(registerDto: RegisterUserDto) {
        this.firstName = registerDto.given_name;
        this.lastName = registerDto.family_name;
        this.email = registerDto.email;
        this.image = registerDto.picture;

    }
}
