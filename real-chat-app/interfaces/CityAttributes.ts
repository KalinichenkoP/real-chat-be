import {CommonAttributes} from './CommonAttributes';
import {RegionAttributes} from './RegionAttributes';
import {Localization} from "./Localization";
export interface CityAttributes extends CommonAttributes {
    title: Localization;
    region?: RegionAttributes;
}
