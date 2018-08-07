import {CanActivate, ExecutionContext,  UnauthorizedException} from '@nestjs/common';
import { Reflector } from "@nestjs/core";

import { IExtendedRequest } from "../core/interfaces/IExtendedRequest";
import {Observable} from 'rxjs';

export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    // canActivate(request: IExtendedRequest, context: ExecutionContext): boolean {
    //     if (!request.session) {
    //         throw new UnauthorizedException("Authorize to perform this action!");
    //     }
    //
    //     const allowedSessions = this.reflector.get<Function[]>("allowedSessions", context.handler);
    //     if (allowedSessions && allowedSessions.length) {
    //         return allowedSessions
    //             .reduce((result: boolean, Session): boolean => result || request.session instanceof Session, false);
    //     }
    //
    //     return true;
    // }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return undefined;
    }
}
