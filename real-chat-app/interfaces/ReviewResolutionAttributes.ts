import {CommonAttributes} from './CommonAttributes';
import {PublicUserAttributes} from './UserAttributes';
import {ReviewAttributes} from './ReviewAttributes';

export interface ReviewResolutionAttributes extends CommonAttributes {
    review?: ReviewAttributes;
    reviewId: number;
    responsible?: PublicUserAttributes;
    responsibleId: number;
    comment: string;
}
