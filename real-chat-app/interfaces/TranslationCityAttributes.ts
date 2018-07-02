import {CommonAttributes} from './CommonAttributes';
import {AdminUserAttributes} from './UserAttributes';
import {LanguageAttributes} from './LanguageAttributes';

export interface TranslationCityAttributes extends CommonAttributes {
    title: string;
    language: LanguageAttributes;
}
