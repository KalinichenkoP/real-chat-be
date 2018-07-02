import {CommonAttributes} from "./CommonAttributes";
import {PublicUserAttributes} from "./UserAttributes";
import {VacationTypeAttributes} from "./VacationTypeAttributes";

export interface VacationAttributes extends CommonAttributes {
    beginningDate: Date;
    endingDate: Date;
    user: PublicUserAttributes;
    vacType: VacationTypeAttributes;
    daysAmount: number;
    isApproved?: number;
}
