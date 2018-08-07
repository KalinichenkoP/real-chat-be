import {Module} from '@nestjs/common';
import {RoomController} from '../../controllers/RoomController';
import {RoomService} from './RoomService';
import {UserService} from '../user/UserService';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Room} from "./RoomEntity";

@Module({
    imports: [TypeOrmModule.forFeature([Room], 'postgres')],
    providers: [ RoomService, UserService],
    controllers: [RoomController],
    exports: [RoomModule]
})
export class RoomModule {
}
