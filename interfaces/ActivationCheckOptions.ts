import {UserInstance} from "../server/models/user";
export interface ActivationCheckOptions {
    readonly route : RegExp;
    readonly validators: {(user: UserInstance) : Promise<boolean>}[];
}
