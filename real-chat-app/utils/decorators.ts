/**
 * This file contains all decorators,
 * used at the server side of application.
 */

import { User } from '../../server/models/user/UserEntity';
import { RouteOptions } from '../interfaces/RouteOptions';
// import { Role } from '../server/models/roles';
import { Request, Response } from 'express';
import Logger from './logger';
import * as CONST from './constants';
import {SocketEventOptions} from '../interfaces/SocketEventOptions';
// import {
//     roleTranslationRole,
//     translationRoleLanguage,
//     translationRoleRole,
//     translationUserLanguage,
//     translationUserUser,
//     userRole,
//     userTranslationUser
// } from "../server/models/associations";

// names of meta-keys; they will be given to fields,
// created in target classes for decoration purposes
const errorMetaKey = '__potentialErrorIndices';
const reqMetaKey = '__requestIndex';
const resMetaKey = '__responseIndex';

/**
 * Helper function for decorating controllers' methods
 * as handlers for HTTP requests.
 */
function decorateHttpMethod (methodIndex: number, url: string) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor): void {
        if (!target.routes) {
            target.routes = [];
        }

        // target is class, inherited from ServerController,
        // so routes are present in it, and are array;
        // we push there all methods marked as handlers
        target.routes.push({
            methodIndex: methodIndex,
            url: url,
            handler: function (...args: any[]) {
                // extra behaviour may be added here
                return descriptor.value.apply(this, args);
            }
        });
    };
}

/**
 * Helper function for creating objects of given class.
 */
function constructExample (constructor: Function, args: any[]) {
    let newConstructor : any = function () {
        return constructor.apply(this, args);
    };
    newConstructor.prototype = constructor.prototype;
    return new newConstructor();
}

/**
 * Helper function for pulling user instance by access token.
 */
async function pullUser (token: string) : Promise<User> {
    return new Promise<User>((resolve, reject) => {
        User.findOne({
            where: {
                accessToken: token
            }
        }).then((user: User) => {
            return resolve(user);
        }).catch((err) => {
            return reject(err);
        });
    });
}

/**
 * Decorated method will serve as handler
 * of GET requests at specified url.
 */
export function Get (url: string) {
    return decorateHttpMethod(CONST.HTTP_METHODS.GET, url);
}

/**
 * Decorated method will serve as handler
 * of POST requests at specified url.
 */
export function Post (url: string) {
    return decorateHttpMethod(CONST.HTTP_METHODS.POST, url);
}

/**
 * Decorated method will serve as handler
 * of PUT requests at specified url.
 */
export function Put (url: string) {
    return decorateHttpMethod(CONST.HTTP_METHODS.PUT, url);
}

/**
 * Decorated method will serve as handler
 * of PATCH requests at specified url.
 */
export function Patch (url: string) {
    return decorateHttpMethod(CONST.HTTP_METHODS.PATCH, url);
}

/**
 * Decorated method will serve as handler
 * of DELETE requests at specified url.
 */
export function Delete (url: string) {
    return decorateHttpMethod(CONST.HTTP_METHODS.DELETE, url);
}

export function SocketHandler (eventIndex: number) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) : void {
        if (!target.socketEvents) {
            target.socketEvents = [];
        }

        target.socketEvents.push({
            eventIndex: eventIndex,
            handler: function (...args: any[]) {
                // extra behaviour may be added here
                return descriptor.value.apply(this, args);
            }
        });
    }
}

/**
 * Decorated Server examples will use certain controller's methods
 * as handlers for it's routes.
 */

/**
 * One of parameters, passed into decorated method, may be an error.
 * If parameter, marked as Error, is casted to true, it is logged
 * and method continues it's execution.
 */
export function MayHaveErrors (target, propertyKey: string, descriptor: PropertyDescriptor) {
    let key = propertyKey + errorMetaKey;
    return {
        value: (...args: any[]) => {
            if (Array.isArray(target[key])) {
                target[key].forEach((index) => {
                    if (args[index]) {
                        Logger.log(Logger.ERROR, args[index]);
                    }
                });
            }

            return descriptor.value.apply(this, args);
        }
    };
}

/**
 * Decorated parameter is marked as possible error.
 */
export function Error (target: any, propertyKey : string, index : number) {
    let key = propertyKey + errorMetaKey;
    Array.isArray(target[key])
        ? target[key].push(index)
        : target[key] = [index];
}

/**
 * Decorated method will only be accessible
 * to users with specified role
 * (others will receive 401 error).
 */
// export function AllowedFor (roles: string[]) {
//     return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
//         let reqIndex = target[propertyKey + reqMetaKey];
//         let resIndex = target[propertyKey + resMetaKey];
//
//         return {
//             value: async (...args: any[]) => {
//                 let req : Request = args[reqIndex];
//                 let res : Response = args[resIndex];
//
//                 let accessToken = req.header('Authorization').split(' ')[1];
//                 let user : User = await pullUser(accessToken);
//                 req['user'] = user;
//
//                 // this actually works only if user roles in DB and in constants are the same,
//                 // and are ordered by permissions amount, ascending;
//                 // also each following role has to include
//                 // permissions of all of the preceding.
//                 const formattedUser = user.toDto();
//                 // formattedUser.role = formatRole(user.toJSON().role);
//                 // const isAllowedToProceed = user && (roles.indexOf( formattedUser.role.title['en']) !== -1);
//
//                 return (isAllowedToProceed)
//                     ? descriptor.value.apply(this, args)
//                     : (() => res.sendStatus(401)).apply(this, args);
//             }
//         };
//     };
// }

function formatRole(role) {
    const fieldsWithTranslate = ['title'];
    fieldsWithTranslate.forEach((fieldName) => {
        role[fieldName] = {};
    });
    role['translationRole'].forEach((fieldsObj) => {
        const language = fieldsObj.language.title;
        for (const prop in fieldsObj) {
            if (fieldsWithTranslate.includes(prop)) {
                role[prop][language] = fieldsObj[prop];
            }
        }
    });
    return role;
}
