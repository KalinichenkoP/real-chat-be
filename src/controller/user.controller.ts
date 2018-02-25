import {Controller, Get, Param, Res, HttpStatus, Inject} from "@nestjs/common";
import {User} from "../entity/user";
import {InjectRepository} from '@nestjs/typeorm';
import {UserService} from "../service/user.service";

@Controller('user')
export class UserController {

    private readonly userService: UserService;

    constructor(@InjectRepository(User)
                    userService: UserService) {
        this.userService = userService;
    }

    @Get()
    async findAll(@Res() res): Promise<User[]> {
        return res.status(HttpStatus.OK).json({this.userService.findAll()});
    }

    @Get(':id')
    async findOne(@Res() res, @Param() params): User {
        console.log(params.id);
        return res.status(HttpStatus.OK).json({});
    }
}
