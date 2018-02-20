import { Controller, Get } from "@nestjs/common";
import {User} from "../entity/user";

@Controller('user')
export class UserController {
    @Get()
    findAll(): User[] {
        return [];
    }
}