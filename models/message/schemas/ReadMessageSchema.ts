import {ObjectSchema} from 'joi';
import * as Joi from 'joi';

import {CreateSchema} from '../../../core/schemas/CreateSchemaFactory';

const MIN_LENGTH = 1;
const MAX_LENGTH = 500;

export class ReadMessageSchema implements CreateSchema {
    createSchema(): ObjectSchema {
        return Joi
            .object()
            .keys({
                messageUUID: Joi
                    .string()
                    .required(),
                roomId: Joi
                    .string()
                    .trim()
                    .min(MIN_LENGTH)
                    .max(MAX_LENGTH)
                    .required(),
                userId: Joi
                    .number()
                    .positive()
                    .required()
            });
    }
}
