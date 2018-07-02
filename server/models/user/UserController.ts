import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {User} from "./UserEntity";
import {UserService} from "./UserService";
import {ListResponseDto} from "../../core/dto/ListResponseDto";
import {UserDto} from "./dto/UserDto";
import {GoogleAuth} from 'google-auth-library';
import {config} from '../../../config/config';
import ServerController from '../../../real-chat-app/classes/ServerController';
import {Md5} from 'ts-md5/dist/md5';

// const gaFactory: any = new GoogleAuth();
// const gaClient = new gaFactory.OAuth2(config.googleAuth.web.clientID, '', '');

@Controller('user')
export class UserController extends ServerController {
    constructor(private readonly userService: UserService) {
        super();
    }


    private checkoutLogin(error: any, login: any): Promise<User> {
        if (error) {
            return Promise.reject(error);
        }

        let payload = login.getPayload();
        return Promise.resolve(this.userService.findByEmail(payload.email));

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

    @Post('/api/users/me/verify-token')
    async verifyToken(@Req() req, @Res() res) {
        const gaFactory: any = new GoogleAuth();
        const gaClient = new gaFactory.OAuth2(config.googleAuth.web.clientID, '', '');
        gaClient.verifyIdToken(
            req.body.idToken,
            config.googleAuth.web.clientID,
            async (error, login) => {
                try {
                    let user: User = await this.checkoutLogin(error, login);
                    if (!user) {
                        return UserController.failure(res, new Error('user not found'));
                    }

                    // access token is a random unique string
                    let accessToken = Md5.hashStr((new Date()).toString()).toString();
                    await this.userService.updateAccessToken(user, accessToken);

                    return UserController.success(res, accessToken);
                } catch (err) {
                    return UserController.failure(res, err);
                }
            }
        );
    }
}
