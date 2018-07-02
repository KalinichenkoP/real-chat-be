import {CommonAttributes} from './CommonAttributes';
import {AdminUserAttributes} from './UserAttributes';

export interface SalarySheetAttributes extends CommonAttributes {
    userId: AdminUserAttributes;
    swift: string;
    ECS: string;
    OOO: string;
    tax1: string;
    cashed: string;
    skipped_days: number;
    month: string;
    year: number;
    sum: number;
    currencyExchange: number;
    userIds?: number[];
}
