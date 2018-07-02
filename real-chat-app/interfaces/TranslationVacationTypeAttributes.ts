import {CommonAttributes} from './CommonAttributes';
import {LanguageAttributes} from './LanguageAttributes';

export interface TranslationVacationTypeAttributes extends CommonAttributes {
    title: string;
    language: LanguageAttributes;
}
