import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Res} from '@nestjs/common';
import {User} from './UserEntity';
import {UserService} from './UserService';
import {ListResponseDto} from '../../core/dto/ListResponseDto';
import {UserDto} from './dto/UserDto';

import {OAuth2Client} from 'google-auth-library';
import {config} from '../../../config/config';
import ServerController from '../../../real-chat-app/classes/ServerController';
import {Md5} from 'ts-md5/dist/md5';

// const gaFactory: any = new OAuth2Client();
const gaClient: any = new OAuth2Client('546854662215-mmnqq81j1bk4k1nf8jn1flugnf9eik28.apps.googleusercontent.com', '', '');

// const gaClient = new gaFactory.OAuth2('546854662215-mmnqq81j1bk4k1nf8jn1flugnf9eik28.apps.googleusercontent.com', '', '');
@Controller('api/v1/users')
export class UserController extends ServerController {
    constructor(private readonly userService: UserService) {
        super();
    }

    private async findOrCreateUser(error: any, login: any): Promise<User> {
        if (error) {
            return Promise.reject(error);
        }
        let payload = login.getPayload();
        console.log(payload);
        let user: User = await this.userService.findByEmail(payload.email);
        if (!user) {
            user = await this.userService.createOne(payload);
            const newUser = await this.userService.findByEmail(payload.email);
            console.log(newUser);
        }

        return user;
        // return Promise.resolve(this.userService.findByEmail(payload.email));
    }


    @Get()
    async findAll(@Req() req): Promise<ListResponseDto<UserDto>> {
        console.log(req);
        console.log(req.header);
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Res() res, @Param('id') id): Promise<UserDto> {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new NotFoundException(`User is absent`);
        }

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

                    const user: User = await this.findOrCreateUser(error, login);
                    // if (!user) {
                    //     return UserController.failure(res, new Error('user not found'));
                    // }

                    // access token is a random unique string
                    let accessToken = await Md5.hashStr((new Date()).toString()).toString();
                    await this.userService.updateAccessToken(user, accessToken);

                    return UserController.success(res, accessToken);
                } catch (err) {
                    return UserController.failure(res, err);
                }
            }
        );
    }
}
