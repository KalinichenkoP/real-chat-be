import {Controller, Get, Param, Res} from "@nestjs/common";
import {User} from "../entity/user";
import {UserService} from "../service/user.service";

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<User> {
        console.log(params.id);
        return this.userService.findById(params.id);
    }
}
