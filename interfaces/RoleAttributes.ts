import {CommonAttributes} from './CommonAttributes';
import {RoleCreateRoleAttributes} from './RoleCreateRoleAttributes';
import {Localization} from "./Localization";
export interface RoleAttributes extends CommonAttributes {
    title: Localization;
    roleCreateRoles?: RoleCreateRoleAttributes[];
    canCreate?: RoleAttributes[];
}
