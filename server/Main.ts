import './configure';

import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./AppModule";
import * as config from "config";
async function bootstrap() {
    console.log('ok');
    const app = await NestFactory.create(ApplicationModule);
    const port = config.get<number>("server.port");
    await app.listen(port);
}

bootstrap();
