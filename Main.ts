import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./AppModule";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, { cors: true });
    app.setGlobalPrefix("/api/v1");
    await app.listen(3000);
}

bootstrap();
