import {ObjectSchema} from 'joi';
import * as Joi from 'joi';

import {CreateSchema} from './CreateSchemaFactory';

const MIN_LENGTH = 1;
const MAX_LENGTH = 500;

export class CreateMessageSchema implements CreateSchema {
    createSchema(): ObjectSchema {
        return Joi
            .object()
            .keys({
                uuid: Joi
                    .string()
                    .required(),
                text: Joi
                    .string()
                    .trim()
                    .min(MIN_LENGTH)
                    .max(MAX_LENGTH)
                    .required(),
                senderId: Joi
                    .number()
                    .required(),
                roomId: Joi
                    .number()
                    .required()
            });
    }
}
