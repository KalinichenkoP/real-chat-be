import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Session,
    UseGuards,
    UsePipes
} from "@nestjs/common";

import { UsersService } from "../components/users/UsersService";
import { CreateSessionDto } from "../components/sessions/dto/CreateSessionDto";
import { ValidationPipe } from "../core/pipes/ValidationPipe";
import { CreateUserSessionSchema } from "../components/sessions/schemas/CreateUserSessionSchema";
import { UnprocessableEntityException } from "../core/errors/UnprocessableEntityException";
import { UserSessionsService } from "../components/sessions/UserSessionsService";
import { SessionRDto } from "../components/sessions/dto/SessionRDto";
import { AuthGuard } from "../guards/AuthGuard";
import { UserSessionDto } from "../components/sessions/dto/UserSessionDto";
import { CryptoManager } from "../core/utils/CryptoManager";
import { AllowSessions } from "../guards/AllowSession";
import { RefreshSessionDto } from "../components/sessions/dto/RefreshSessionDto";
import { RefreshSessionSchema } from "../components/sessions/schemas/RefreshSessionSchema";
import { Session as SessionEntity } from "../database/models/sessions/Session";
import { User } from "../database/models/users/User";

@Controller("sessions")
export class SessionController {
    constructor(@Inject("SessionsRepository") private readonly sessions: typeof SessionEntity,
                private readonly userSessionsService: UserSessionsService,
                private readonly usersService: UsersService) {
    }

    @Post()
    @UsePipes(new ValidationPipe(new CreateUserSessionSchema()))
    async startSession(@Body() createSessionDto: CreateSessionDto): Promise<SessionRDto> {
        const user = await this.usersService.findByUsername(createSessionDto.userName);

        if (!user || !CryptoManager.verifyPass(createSessionDto.password, user.passHash)) {
            throw new UnprocessableEntityException(`Incorrect username or password!`);
        }


        const session = await this.userSessionsService.create(user.id, createSessionDto);
        return new SessionRDto(session, user.toDto());
    }

    @Delete("current")
    @AllowSessions(UserSessionDto)
    @UseGuards(AuthGuard)
    async destroyCurrent(@Session() session: UserSessionDto): Promise<void> {
        await this.userSessionsService.destroy(session.sessionId);
    }

    @Post("refreshed")
    @UsePipes(new ValidationPipe(new RefreshSessionSchema()))
    async refresh(@Body() refresh: RefreshSessionDto): Promise<SessionRDto> {
        const session = await this.sessions.findOne({
            where: { refreshToken: refresh.refreshToken },
            include: [User]
        });

        if (!session) {
            throw new UnprocessableEntityException("Session does not exist or has been already destroyed!");
        }

        const newSession = await this.userSessionsService.refresh(session);
        return new SessionRDto(newSession, session.user.toDto());
    }
}
