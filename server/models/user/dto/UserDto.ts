import { User } from "../UserEntity";
import { BaseDto } from "../../base/dto/BaseDto";

export class UserDto extends BaseDto<User> {

    readonly userName: string;

    readonly fullName: string;


    constructor(user: User) {
        super(user);
        this.userName = user.firstName;
        this.fullName = user.lastName;
    }
}
