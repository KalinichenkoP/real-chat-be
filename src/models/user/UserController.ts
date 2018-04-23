import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Res} from "@nestjs/common";
import {User} from "./UserEntity";
import {UserService} from "./UserService";

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService) {
    }

    @Get()
    async findAll(): Promise<[User[], number]> {
        return await this.userService.find();
    }

    @Get(':id')
    async findOne(@Res() res, @Param("id") id) {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new NotFoundException(`User is absent`);
        }

        res.json(user);
    }

}
