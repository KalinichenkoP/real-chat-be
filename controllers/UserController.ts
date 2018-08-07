import {Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, UsePipes} from '@nestjs/common';
import {User} from '../models/user/UserEntity';
import {UserService} from '../models/user/UserService';
import {ListResponseDto} from '../core/dto/ListResponseDto';
import {UserDto} from '../models/user/dto/UserDto';

import {OAuth2Client} from 'google-auth-library';
import ServerController from '../classes/ServerController';
import {Md5} from 'ts-md5/dist/md5';
import {RoomDto} from '../models/room/dto/RoomDto';
import {JoiValidationPipe} from '../core/pipes/JoiValidationPipe';
import {FindByIdSchema} from '../core/schemas/FindByIdSchema';
import {PaginationSchema} from '../core/schemas/PaginationSchema';
import {FindUsersDto} from '../models/user/dto/FindUsersDto';
import {FindUsersSchema} from '../models/user/schemas/FindUsersSchema';

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
        let user: User = await this.userService.findByEmail(payload.email);

        if (!user) {
            user = await this.userService.createOne(payload);
        }
        return user.toDto();
    }

    @Get()
    @UsePipes(new JoiValidationPipe<FindUsersDto>(new FindUsersSchema()))
    async findAll(@Query() query: FindUsersDto): Promise<ListResponseDto<UserDto>> {
        const res = await this.userService.findAll(query);
        const users = res[0].map((user) => user.toDto());
        return new ListResponseDto<UserDto>(users, res[1]);
    }

    @Get('room/:roomId')
    @UsePipes(new JoiValidationPipe<number>(new FindByIdSchema()))
    async findByRoom(@Param('roomId') roomId:number): Promise<ListResponseDto<UserDto>> {
        return await this.userService.findByRoom(roomId);
    }

    @Get(':id')
    @UsePipes(new JoiValidationPipe<number>(new FindByIdSchema()))
    async findOne(@Param('id') id: number): Promise<UserDto> {
        return await this.userService.findById(id);
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
