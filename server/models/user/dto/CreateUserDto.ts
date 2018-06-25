import { RegisterUserDto } from "./RegisterUserDto";

export class CreateUserDto {
    readonly userName: string;
    readonly fullName: string;
    readonly phone: string;
    readonly birthday: string;
    readonly passHash: string;

    constructor(registerDto: RegisterUserDto, passHash: string) {
        this.userName = registerDto.userName;
        this.fullName = registerDto.fullName;
        this.phone = registerDto.phone;
        this.passHash = passHash;

    }
}
