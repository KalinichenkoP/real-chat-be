import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Service that performs HTTP requests.
 * This is just a wrapper above Angular's basic 'Http'.
 * Making it was necessary because of authentication purposes:
 * since Angular doesn't provide http-interceptors (as AngularJS did),
 * we have to add special headers manually, and wrapping each basic method
 * into our custom one allows us to do this.
 */
@Injectable()
export class HttpClient {
    // name of a field in local storage where access token will be kept
    private atMetaKey: string = '__hr_at';

    // access token used for authentication
    private authToken: string = localStorage.getItem(this.atMetaKey);

    constructor ( private http: Http ) { }

    /**
     * Save access token of our application
     * (write it to local storage and keep inside service).
     */
    public setAuthToken (token: string): void {
        localStorage.setItem(this.atMetaKey, token);
        this.authToken = token;
    }

    /**
     * Get default HTTP options, included in every request
     * (currently -  authorization and content-type headers).
     */
    private getDefaultOptions (): RequestOptionsArgs {
        const headers = new Headers();
        headers.append(`Authorization`, `Basic ${this.authToken}`);
        headers.append(`Content-Type`, `application/json`);
        headers.append('Accept-Language', localStorage.getItem('locale'));

        return {
            headers: headers
        };
    }

    /**
     * Inner method for actual requesting.
     */
    private performRequest (
        method: string, url: string,
        data?: string, options?: RequestOptionsArgs
    ): Observable<Response> {
        // getting default options
        const defaultOptions = this.getDefaultOptions();

        // if user provided specific options,
        // they extend defaults (overriding duplicates)
        if (options) {
            Object.assign(defaultOptions, options);
        }

        const requestURL = `${environment.backendURL}${url}`;

        // calling named method from original 'Http' service;
        // for POST, PUT, and PATCH we provide data,
        // for GET and DELETE - we do not
        return ['post', 'put', 'patch'].includes(method)
            ? this.http[method](requestURL, data, defaultOptions)
            : this.http[method](requestURL, defaultOptions);
    }

    /**
     * Perform authorized GET request.
     */
    public get (url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.performRequest('get', url, null, options);
    }

    /**
     * Perform authorized POST request.
     */
    public post (url: string, data: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.performRequest('post', url, data, options);
    }

    /**
     * Perform authorized PUT request.
     */
    public put (url: string, data: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.performRequest('put', url, data, options);
    }

    /**
     * Perform authorized PATCH request.
     */
    public patch (url: string, data: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.performRequest('patch', url, data, options);
    }

    // noinspection ReservedWordAsName
    /**
     * Perform authorized DELETE request.
     */
    public delete(url, options?: RequestOptionsArgs) {
        return this.performRequest('delete', url, null, options);
    }
}
