import {CommonAttributes} from './CommonAttributes';
import {PublicUserAttributes} from './UserAttributes';
import {VacationAttributes} from './VacationAttributes';

export interface VacationResolutionAttributes extends CommonAttributes {
    requesterId: number;
    requesterName: string;
    requesterSurname: string;
    requesterPosition: string;
    requesterDepartment: string;
    vacationId: number;
    beginningDate: Date;
    endingDate: Date;
    daysAmount: number;
    isApproved: boolean;
    resolutions: {
        reviewerId: number;
        reviewerName: string;
        reviewerSurname: string;
        approved: boolean;
        comment: string;
    }[];
}
