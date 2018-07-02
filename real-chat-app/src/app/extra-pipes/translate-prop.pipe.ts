import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {Localization} from "../../../interfaces/Localization";

/**
 * Pipe, show translation of property in depending from the current language
 */
@Pipe({
    name: 'translateProp',
    pure: false
})
export class TranslateProp implements PipeTransform {
    transform(property: Localization, propName: string): string {
        let translatedProp: string;
        switch (propName) {
            case 'name':
            case 'surname':
            case 'middleName': {
                if (localStorage.getItem('locale') === 'ru') {
                    translatedProp = property['uk'];
                } else {
                    translatedProp = property[localStorage.getItem('locale')];
                }
                break;
            }
            default: {
                translatedProp = property[localStorage.getItem('locale')];
            }
        }
        return translatedProp;
    }
}
