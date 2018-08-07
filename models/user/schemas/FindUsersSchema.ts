import { PaginationSchema } from "../../../core/schemas/PaginationSchema";
import { ObjectSchema } from "joi";
import * as Joi from "joi";

import { CreateSchema } from "../../../core/schemas/CreateSchemaFactory";

const MIN_SEARCH_LENGTH = 3;

export class FindUsersSchema extends PaginationSchema implements CreateSchema {
    createSchema(): ObjectSchema {
        return super.createSchema()
            .keys({
                search: Joi
                    .string()
                    .min(MIN_SEARCH_LENGTH)
            });
    }
}
