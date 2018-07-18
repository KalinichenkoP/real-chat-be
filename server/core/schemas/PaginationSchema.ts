import { ObjectSchema } from "joi";
import * as Joi from "joi";

import { CreateSchema } from "./CreateSchemaFactory";

const MIN_LIMIT = 0;
const MAX_LIMIT = 50;
const MIN_OFFSET = 0;

export class PaginationSchema implements CreateSchema {
    createSchema(): ObjectSchema {
        return Joi
            .object()
            .keys({
                limit: Joi.number()
                    .integer()
                    .min(MIN_LIMIT)
                    .max(MAX_LIMIT)
                    .default(MAX_LIMIT)
                    .optional(),
                offset: Joi.number()
                    .integer()
                    .min(MIN_OFFSET)
                    .default(MIN_OFFSET)
                    .optional()
            });
    }
}
