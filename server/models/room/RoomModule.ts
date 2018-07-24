import {Module} from '@nestjs/common';
import {RoomController} from './RoomController';
import {RoomService} from './RoomService';
import {DatabaseModule} from '../../database/DatabaseModule';
import {roomProvider} from './RoomProvider';
import {UserService} from '../user/UserService';
import {userProvider} from '../user/UserProvider';

@Module({
    imports: [DatabaseModule],
    providers: [...roomProvider, RoomService, ...userProvider, UserService],
    controllers: [RoomController],
    exports: [RoomModule]
})
export class RoomModule {
}
