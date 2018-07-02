import {CommonAttributes} from './CommonAttributes';
import {CityAttributes} from './CityAttributes';
import {PositionAttributes} from './PositionAttributes';
import {DepartmentAttributes} from './DepartmentAttributes';
import {RoleAttributes} from './RoleAttributes';
import {Localization} from './Localization';

export interface PublicUserAttributes
    extends CommonAttributes {
        surname?: Localization;
        name?: Localization;
        middleName?: Localization;
        photo: string;
        skype: string;
        email: string;
        position: PositionAttributes;
        department: DepartmentAttributes;
        role: RoleAttributes;
    }

export interface AdminUserAttributes
    extends CommonAttributes, PublicUserAttributes {
        cv: string;
        passNumber: string;
        passIssuedBy?: string;
        passIssuedAt: Date;
        city: CityAttributes;
        registrationAddress?: string;
        TIN: string;
        isSoleProprietor: boolean;
        SPGroup: number;
        initialSalary: number;
        previousSalary: number;
        currentSalary: number;
        accessToken: string;
        firstWorkDay: Date;
        lastWorkDay: Date;
        dateOfBirth: Date;
        previousJob?: string;
        children?: boolean;
        phoneNumber?: string;
    }

    export interface SuperAdminUserAttributes
        extends CommonAttributes, AdminUserAttributes, PublicUserAttributes {
        vacationDaysAvailable: number;
        sickLeaveAvailable: number;
        sickDaysAvailable: number;
    }
