import {CommonAttributes} from './CommonAttributes';
import {ReviewTypeAttributes} from './ReviewTypeAttributes';
import {SuperAdminUserAttributes} from './UserAttributes';
import {ReviewResolutionAttributes} from "./ReviewResolutionAttributes";
export interface ReviewAttributes extends CommonAttributes {
    respondent?: SuperAdminUserAttributes;
    respondentId: number;
    plannedDate: Date;
    actualDate?: Date;
    plan?: string;
    report?: string;
    status?: boolean;
    reviewType?: ReviewTypeAttributes;
    reviewTypeId: number;
    currentSalary?: number;
    newSalary?: number;
    startDateOfNewSalary?: Date;
    difference?: number;
    resolutions?: ReviewResolutionAttributes[];
}
