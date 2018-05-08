import {Controller, Get, NotFoundException, Param, Res} from "@nestjs/common";
import {SessionService} from "./SessionService";


@Controller('session')
export class SessionController {


    constructor(private readonly sessionService: SessionService) {
    }

    @Get(':id')
    async findOne(@Res() res, @Param("id") id) {
        const user = await this.sessionService.findById(id);

        if (!user) {
            throw new NotFoundException(`User is absent`);
        }

        res.json(user);
    }
}
