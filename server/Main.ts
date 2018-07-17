import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./AppModule";
import { WsAdapter } from "@nestjs/websockets/adapters";
// import * as config from "config";
async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, { cors: true });
    app.setGlobalPrefix("/api/v1");
    app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
    const port = 3000;
    await app.listen(port);
}

bootstrap();
