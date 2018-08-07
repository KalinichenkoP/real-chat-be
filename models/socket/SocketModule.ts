import {Module} from '@nestjs/common';
import {SocketGateway} from './SocketGateway';

@Module({
    providers: [
        SocketGateway,
    ],
})
export class SocketModule {
}
