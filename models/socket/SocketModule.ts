import {Module} from '@nestjs/common';
import {SocketService} from './SocketService';

@Module({
    providers: [
        SocketService,
    ],
})
export class SocketModule {
}
