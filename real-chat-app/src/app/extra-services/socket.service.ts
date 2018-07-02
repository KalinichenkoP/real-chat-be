import { NotifierService } from "../notifier/notifier.service";
import { SOCKET_MESSAGES } from "../../../utils/constants";
import { AuthService } from "../google-auth/auth.service";
import { HttpClient } from "./http-client.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import ClientService from "../../../classes/ClientService";
import * as socketIO from "socket.io-client";

/**
 * Service that maintains sockets.
 * Currently is only used to receive some notifications from server.
 */
@Injectable()
export class SocketService extends ClientService {
    // client side socket
    private ioClient: SocketIOClient.Socket;

    // behaviour subject that will emit
    // messages of notifications received from server
    private newNotificationBH: BehaviorSubject<string> = new BehaviorSubject(null);

    // observable for 'new notification' event
    public notifications: Observable<string> = this.newNotificationBH.asObservable();

    constructor (
        protected http: HttpClient,
        protected notify: NotifierService,
        private auth: AuthService
    ) {
        super(http, notify);

        // socket init is async, but we do not rely on it's finishing,
        // so we can start it here immediately
        this.socketInit();
    }

    /**
     * Initialize socket: create, identify self, listen for events
     */
    private async socketInit () {
        // URL of server-side socket to connect is pulled,
        // because it may not coincide with our API server
        const connectionURL: string = await this.simpleGET("/api/sockets/connection-url");
        this.ioClient = socketIO(connectionURL);

        // getting current user info to link socket with user ID
        const currentUser = await this.auth.getCurrentUserInfo();
        this.ioClient.emit(SOCKET_MESSAGES.WHO + "", currentUser.id);

        // service doesn't process data by itself, just emits it further
        this.ioClient.on(SOCKET_MESSAGES.NEW_NOTIFICATION + "", (data: string) => {
            this.newNotificationBH.next(data);
        });

        // small note about those weird "CONSTANT + ''" things:
        // events in socket.io should necessarily be strings, and our constants are numbers;
        // '(...).toString()' and '(...) as string' do not work here (TS refuses to compile),
        // so we use this casting hack, in order not to change constants type for this case only
    }
}
