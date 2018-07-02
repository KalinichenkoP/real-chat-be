import {CommonAttributes} from './CommonAttributes';
import {LanguageAttributes} from './LanguageAttributes';

export interface TranslationRoleAttributes extends CommonAttributes {
    title: string;
    language: LanguageAttributes;
}
