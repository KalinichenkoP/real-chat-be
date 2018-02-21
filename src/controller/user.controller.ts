import { Controller, Get, Param, Res, HttpStatus} from "@nestjs/common";
import {User} from "../entity/user";

@Controller('user')
export class UserController {
    @Get()
    findAll(@Res() res): User[] {
        return res.status(HttpStatus.OK).json([]);
    }

    @Get(':id')
    findOne(@Res() res, @Param() params): User {
        console.log(params.id);
        return res.status(HttpStatus.OK).json({});
    }
}
