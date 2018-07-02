export interface VacationDetails {
    requesterId: number;
    requesterName: string;
    requesterSurname: string;
    vacationId: number;
    beginningDate: Date;
    endingDate: Date;
    createdAt: Date;
    updatedAt: Date;
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
