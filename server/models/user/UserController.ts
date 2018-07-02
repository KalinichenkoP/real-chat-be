import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {User} from "./UserEntity";
import {UserService} from "./UserService";
import {ListResponseDto} from "../../core/dto/ListResponseDto";
import {UserDto} from "./dto/UserDto";
import * as GoogleAuth from 'google-auth-library';
import {config} from '../../../real-chat-app/src/config/config';
import ServerController from '../../../real-chat-app/classes/ServerController';
import {Md5} from 'ts-md5/dist/md5';

const gaFactory = new GoogleAuth();
const gaClient = new gaFactory.OAuth2(config.googleAuth.web.clientID, '', '');

@Controller('user')
export class UserController extends ServerController {

    constructor(private readonly userService: UserService) {
        super();
    }

    private static checkoutLogin(error: any, login: any): Promise<User> {
        if (error) {
            return Promise.reject(error);
        }

        let payload = login.getPayload();
        return Promise.resolve(this.userService.findOne({
            where: {email: payload.email}
        }));

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
        gaClient.verifyIdToken(
            req.body.idToken,
            config.googleAuth.web.clientID,
            async (error, login) => {
                try {
                    let user: User = await UserController.checkoutLogin(error, login);
                    if (!user) {
                        return UserController.failure(res, new Error('user not found'));
                    }

                    // access token is a random unique string
                    let accessToken = Md5.hashStr((new Date()).toString());
                    await this.userService.updateAttributes({accessToken: accessToken});

                    return UserController.success(res, accessToken);
                } catch (err) {
                    return UserController.failure(res, err);
                }
            }
        );
    }
}
