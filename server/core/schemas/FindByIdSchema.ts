import { NumberSchema } from "joi";
import * as Joi from "joi";

import { CreateSchema } from "./CreateSchemaFactory";

export class FindByIdSchema implements CreateSchema {
    createSchema(): NumberSchema {
        return Joi.number()
            .integer()
            .positive()
            .required();
    }
}
