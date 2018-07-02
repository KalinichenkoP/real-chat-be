import {CommonAttributes} from './CommonAttributes';
import {LanguageAttributes} from './LanguageAttributes';

export interface TranslationReviewTypeAttributes extends CommonAttributes {
    title: string;
    language: LanguageAttributes;
}
