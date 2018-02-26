import {Controller, Get, Param, Res, HttpStatus} from "@nestjs/common";
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
    findOne(@Res()res, @Param() params): Promise<User> {
        return this.userService.findById(params.id);
    }
}
