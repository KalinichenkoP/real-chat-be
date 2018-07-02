import {CommonAttributes} from './CommonAttributes';
import {LanguageAttributes} from './LanguageAttributes';

export interface TranslationUserAttributes extends CommonAttributes {
    name: string;
    surname: string;
    middleName: string;
    registrationAddress: string;
    passIssuedBy: string;
    userId: number;
    languageId: number;
    language?: LanguageAttributes;
}
