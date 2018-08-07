import { MayHaveErrors, Error } from '../utils/decorators';
import { APIResponse } from '../interfaces/APIResponse';
import { Response } from 'express';
import * as CONST from './../utils/constants';

/**
 * Base controller class; all controllers _must_ extend this one.
 */
export default class ServerController {
    /**
     * Send response to client (after successful action).
     */
    public static success (res: Response, payload: any) {
        let apiResponse : APIResponse = {
            status: CONST.STATUSES.OK,
            payload: payload
        };
        return res.send(apiResponse);
    }

    /**
     * Send response to client (after action that led to an error).
     * Error, if present, is logged.
     */
    @MayHaveErrors
    public static failure (res: Response, @Error error: any) {
      // console.log(error);
        let apiResponse : APIResponse = {
            status: CONST.STATUSES.ERROR,
            payload: (error && error.message)
                ? error.message
                : 'unknown failure'
        };
        return res.send(apiResponse);
    }
}
