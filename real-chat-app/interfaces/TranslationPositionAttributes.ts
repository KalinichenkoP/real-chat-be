import {CommonAttributes} from './CommonAttributes';
import {LanguageAttributes} from './LanguageAttributes';

export interface TranslationPositionAttributes extends CommonAttributes {
    title: string;
    language: LanguageAttributes;
}
