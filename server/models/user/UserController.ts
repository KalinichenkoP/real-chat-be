import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Res} from "@nestjs/common";
import {User} from "./UserEntity";
import {UserService} from "./UserService";
import {ListResponseDto} from "../../core/dto/ListResponseDto";
import {UserDto} from "./dto/UserDto";

@Controller('user')
export class UserController {


    constructor(private readonly userService: UserService) {
    }

    @Get()
    async findAll(): Promise<ListResponseDto<UserDto>> {
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
