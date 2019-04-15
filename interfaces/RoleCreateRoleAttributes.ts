import {CommonAttributes} from './CommonAttributes';

export interface RoleCreateRoleAttributes extends CommonAttributes {
    roleId: number;
    canCreateRoleId?: number;
}
