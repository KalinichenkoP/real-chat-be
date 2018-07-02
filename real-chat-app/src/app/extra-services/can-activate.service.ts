import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { NotifierService } from '../notifier/notifier.service';
import { URLSearchParams, Response } from '@angular/http';
import { HttpClient } from './http-client.service';
import { Injectable } from '@angular/core';

/**
 * Service that protects routes that need that;
 * can be used as a guard for both route itself and it's children.
 */
@Injectable()
export class ActivationGuard implements CanActivate, CanActivateChild {
    constructor (
        private http: HttpClient,
        private router: Router,
        private notify: NotifierService
    ) { }

    /**
     * Inner method for checking permissions.
     */
    private checkPermissions (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return new Promise<boolean>((resolve, reject) => {
            let params = new URLSearchParams();
            params.set('targetRoute', state.url);

            // it was decided to perform checking on server
            return this.http
                .get('/api/check-permissions', { search: params })
                .toPromise()
                .then((res: Response) => {
                    let isAllowed : boolean = res.json().payload;

                    // if user is not allowed to visit the URL he entered,
                    // redirect him to 'Auth' instead
                    if (!isAllowed) {
                        this.router.navigateByUrl('/auth');
                    }

                    return resolve(isAllowed);
                })
                .catch((err: any) => {
                    this.notify.debug(err);

                    // if request has failed, we do not know if user has enough permissions,
                    // so we cannot let him proceed to target page
                    this.router.navigateByUrl('/auth');
                    return resolve(false);
                });
        });
    }

    /**
     * Implementation of Angular 'canActivate' guard.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkPermissions(route, state);
    }

    /**
     * Implementation of Angular 'canActivateChild' guard.
     */
    canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkPermissions(route, state);
    }
}
