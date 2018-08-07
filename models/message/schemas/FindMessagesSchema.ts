import { PaginationSchema } from "../../../core/schemas/PaginationSchema";
import { ObjectSchema } from "joi";

import { CreateSchema } from "../../../core/schemas/CreateSchemaFactory";

export class FindMessagesSchema extends PaginationSchema implements CreateSchema {
    createSchema(): ObjectSchema {
        return super.createSchema();
    }
}
