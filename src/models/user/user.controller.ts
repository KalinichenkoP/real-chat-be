import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Res} from "@nestjs/common";
import {User} from "./user.entity";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService) {
    }

    @Get()
    async findAll(): Promise<[User[], number]> {
        return await this.userService.find();
    }

    @Get(':id')
    async findOne(@Res() res, @Param() params) {
        const user = await this.userService.findById(params.id);

        if (!user) {
            throw new NotFoundException(`User is absent`);
        }

        res.json(user);
    }
}
