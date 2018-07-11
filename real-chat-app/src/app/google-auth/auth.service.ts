import { HttpClient } from "../extra-services/http-client.service";
import { NotifierService } from "../notifier/notifier.service";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import ClientService from "../../../classes/ClientService";
// import {PublicUserAttributes} from "../../../interfaces/UserAttributes";
// import {HttpClient} from '@angular/common/http';

// 'gapi' is a global object, created by Google API client library;
// we have typings for it, but still need declaring this way for it to work normally
declare const gapi: any;

/**
 * Service that deals with everything connected with
 * auth and Google API in general.
 */
@Injectable()
export class AuthService extends ClientService {
    // behaviour subject for 'GAPI is ready' event
    private gapiBehaviourSubject = new BehaviorSubject<boolean>(false);

    // observable from 'gapiBehaviourSubject'
    public gapiReady = this.gapiBehaviourSubject.asObservable();

    constructor (
        protected http: HttpClient,
        protected notify: NotifierService
    ) {
        super(http, notify);

        // settings for Google API
        const initSettings = {
            // exposed client ID isn't security issue,
            // but it'd better be stored in manifest
            "client_id": "546854662215-mmnqq81j1bk4k1nf8jn1flugnf9eik28.apps.googleusercontent.com",
            "fetch_basic_profile": true,
            "scope": "profile"
        };

        // hacks time: how to let others know that gapi is ready
        function tryLoading () {
            // first step: we have to wait until 'gapi' object is available;
            // it is created by Google's script, which is loaded asynchronously,
            // so we have to check manually if it is there already or not
            if (typeof gapi === "undefined") {
                // was unable to come up with anything smarter
                // than periodical check with 'setTimeout'
                return setTimeout(tryLoading.bind(this), 1000);
            }

            // when 'gapi' is not undefined, it still isn't ready to be used:
            // distinct parts of it have to be initialized separately
            return gapi.load("auth2", () => {
                // so, we init 'auth2' with the settings prepared
                gapi.auth2.init(initSettings);

                // and, after all, fire an event
                this.gapiBehaviourSubject.next(true);
            });
        }

        // start trying immediately
        tryLoading.bind(this)();
    }

    /**
     * Verify ID token received from Google auth;
     * verification is performed on server and proves
     * that current user is an actual company employee.
     * Save access token, received through verification.
     */
    public async verifyGAToken (idToken: string) : Promise<boolean> {
        const body = JSON.stringify({ idToken: idToken });
        try {
            console.log('REQUEST');
            const authToken: string = await this.simplePOST("/users/me/verify-token", body);
            console.log(authToken);
            this.http.setAuthToken(authToken);
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Inner method for checking when user
     * is considered signed in.
     */
    private async prepareProfile () {
        return new Promise<any>((resolve) => {
            // works by the same scheme as 'tryLoading' in constructor does
            function checkSignedIn () {
                if (gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    return resolve();
                }
                setTimeout(checkSignedIn, 200);
            }
            checkSignedIn();
        });
    }

    // /**
    //  * Get info about user, currently being signed in
    //  * (public attributes of his profile).
    //  */
    // public async getCurrentUserInfo () : Promise<PublicUserAttributes> {
    //     // todo: cache this info not to send requests every time
    //     return this.simpleGET("/api/users/me");
    // }

    /**
     * Log out from application:
     * remove access token on server and locally.
     */
    public async logOut () : Promise<boolean> {
        try {
            await this.simplePOST("/api/users/me/logout", null);
            this.http.setAuthToken(null);
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
