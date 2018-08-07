import { User } from "../UserEntity";
import { BaseDto } from "../../base/dto/BaseDto";

export class UserDto extends BaseDto<User> {
    readonly firstName: string;
    readonly lastName: string;
    readonly image: string;

    constructor(user: User) {
        super(user);
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.image = user.image;
    }
}
