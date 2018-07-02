import { SpinnerService } from '../src/app/extra-services/loading-spinner.service';
import { HttpClient } from '../src/app/extra-services/http-client.service';
import { NotifierService } from '../src/app/notifier/notifier.service';
import { APIResponse } from '../interfaces/APIResponse';
import { STATUSES } from '../utils/constants';
import { Injectable } from '@angular/core';

/**
 * Base class for client services
 * (to be extended by Angular services used on client side).
 * Contains methods for making simple
 * GET, POST, PUT, PATCH and DELETE requests.
 */
@Injectable()
export default class ClientService {
    constructor (
        protected http: HttpClient,
        protected notify: NotifierService
    ) { }

    /**
     * Inner method for actual performing HTTP-requests.
     */
    private async performRequest (method: string, url: string, data?: string) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            // calling named method from modified http-client
            this.http[method](url, data)
                // turning it to Promise, cause there is no point in using Observables
                // for simple non-repeating requests
                .toPromise()
                .then((res: any) => {
                    let response = res.json() as APIResponse;

                    // checking response status, leaving debug info about errors
                    if (response.status !== STATUSES.OK) {
                        this.notify.debug(response.payload);
                        return reject(`Cannot ${method}: ${url}`);
                    }

                    // if everything is correct, return received payload
                    return resolve(response.payload);
                })
                .catch((err: any) => {
                    // process errors that were caused by broken request
                    // (like missing route or interrupted connection)
                    this.notify.debug(err);
                    return reject('Requesting API failed');
                });
        });
    }

    /**
     * Perform simple GET request.
     * After Promise resolving, returns payload.
     */
    public async simpleGET (url: string) : Promise<any> {
        return this.performRequest('get', url);
    }

    /**
     * Perform simple POST request.
     * After Promise resolving, returns payload.
     */
    public async simplePOST (url: string, data: string) : Promise<any> {
        return this.performRequest('post', url, data);
    }

    /**
     * Perform simple PUT request.
     * After Promise resolving, returns payload.
     */
    public async simplePUT (url: string, data: string) : Promise<any> {
        return this.performRequest('put', url, data);
    }

    /**
     * Perform simple PATCH request.
     * After Promise resolving, returns payload.
     */
    public async simplePATCH (url: string, data: string) : Promise<any> {
        return this.performRequest('patch', url, data);
    }

    /**
     * Perform simple DELETE request.
     * After Promise resolving, returns payload.
     */
    public async simpleDELETE (url: string) : Promise<any> {
        return this.performRequest('delete', url);
    }
}
