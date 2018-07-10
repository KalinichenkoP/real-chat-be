import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {User} from './UserEntity';
import {UserService} from './UserService';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {UserDto} from './dto/UserDto';

import {OAuth2Client} from 'google-auth-library';
import ServerController from '../../../real-chat-app/classes/ServerController';
import {Md5} from 'ts-md5/dist/md5';

const gaClient: any = new OAuth2Client('546854662215-mmnqq81j1bk4k1nf8jn1flugnf9eik28.apps.googleusercontent.com', '', '');


@Controller('users')
export class UserController extends ServerController {
    constructor(private readonly userService: UserService) {
        super();
    }

    private async findOrCreateUser(error: any, login: any): Promise<UserDto> {
        if (error) {
            return Promise.reject(error);
        }
        let payload = login.getPayload();
        const user: UserDto = await this.userService.findByEmail(payload.email);
        if (!user) {
            const user: UserDto = await this.userService.createOne(payload);
        }

        return user;
    }


    @Get()
    async findAll(@Req() req): Promise<ListResponseDto<UserDto>> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<UserDto> {
        const user = await this.userService.findById(id);

        return res.json(user);
    }

    @Post('/me/verify-token')
    async verifyToken(@Req() req, @Res() res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        const idToken = req.body.idToken; // the token received from the JS client
        const audiance = '546854662215-mmnqq81j1bk4k1nf8jn1flugnf9eik28.apps.googleusercontent.com'; // gapi client id
        gaClient.verifyIdToken({idToken, audiance}, async (error, login) => {
                try {
                    console.log(login);

                    const user: UserDto = await this.findOrCreateUser(error, login);
                    // access token is a random unique string
                    let accessToken = await Md5.hashStr((new Date()).toString()).toString();
                    // await this.userService.updateAccessToken(user, accessToken);

                    return UserController.success(res, accessToken);
                } catch (err) {
                    return UserController.failure(res, err);
                }
            }
        );
    }
}
