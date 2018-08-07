import { Base } from "../BaseEntity";
import { TimeManager } from "../../../core/utils/TimeManager";

export class BaseDto<T> {
    readonly id: number;

    readonly createdAt: number;

    readonly updatedAt: number;

    constructor(baseModel: Base<T>) {
        this.createdAt = TimeManager.getUTCSeconds(baseModel.createdAt);
        this.updatedAt = TimeManager.getUTCSeconds(baseModel.updatedAt);
    }
}
