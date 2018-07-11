import {NestFactory} from "@nestjs/core";
import {ApplicationModule} from "./AppModule";
// import * as config from "config";
async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, { cors: true });
    app.setGlobalPrefix("/api/v1");
    const port = 3000;
    const server = await app.listen(port);

    const io = require('socket.io')(server);
    const redisAdapter = require('socket.io-redis');
    io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

    var your_namespace_socket = io.of('/your-namespace');
    your_namespace_socket.on('connection', function(socket){
        console.log('connected');
        socket.on('join', function(room){
            socket.join(room);

            //log other socket.io-id's in the room
            your_namespace_socket.adapter.clients([room], (err, clients) => {
                console.log(clients);
            });
        });
    });
}

bootstrap();
