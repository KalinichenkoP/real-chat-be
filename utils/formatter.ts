import {RegionAttributes} from "../interfaces/RegionAttributes";
import {LocalizationService} from "../src/app/services/localization.service";
import {CityAttributes} from "../interfaces/CityAttributes";
import {IMyDateModel} from "mydatepicker";

export default class Formatter {
    public static camelCaseToUnderscored(text: string): string {
        return text
            .replace(/([A-Z])/g, '_$1')
            .toLowerCase();
    }

    public static clientDateToNormal(clientDate: any): Date {
        return (clientDate)
            ? new Date(
                clientDate.date.year,
                clientDate.date.month - 1,
                clientDate.date.day)
            : null;
    }

    public static locationToString(location: CityAttributes): string {
        return location.title.en;
    }

    private static isPropForCurrLang(property: string, lang: string): boolean {
        return (property.substring(-3, property.length) === lang);
    }

    public static formatSequelizeInstance(sequelizeInstance: any, propNeedTranslate: string[], lang: string, nestedInstancesNames?: string[]): any {
        const formattedInstance = {};
        for (const prop in sequelizeInstance) {
            if (nestedInstancesNames.includes(prop)) {
                this[prop].format();
            }
            const property = prop.substring(0, prop.length - 3);
            if (propNeedTranslate.includes(property)) {
                if (Formatter.isPropForCurrLang(prop, lang)) {
                    formattedInstance[property] = sequelizeInstance[prop];
                }
            } else {
                formattedInstance[prop] = sequelizeInstance[prop];
            }
        }
        return formattedInstance;
    }

    public static convertDateTimeZone(date: IMyDateModel): Date {
        const oldDate = new Date(date.jsdate);
        const offSetMs = (oldDate.getTimezoneOffset() * 60) * 1000;
        return new Date(oldDate.getTime() + offSetMs);
    }

    public static camelize(str: string): string {
        return str.toLowerCase().replace(/_(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    public static dateToSqlFormat(date: Date): string {
        const temp = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
        return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    }
}
