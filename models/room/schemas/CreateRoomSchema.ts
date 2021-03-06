import {ObjectSchema} from 'joi';
import * as Joi from 'joi';

import {CreateSchema} from '../../../core/schemas/CreateSchemaFactory';

const MIN_LENGTH = 3;
const MAX_LENGTH = 50;

export class CreateRoomSchema implements CreateSchema {
    createSchema(): ObjectSchema {
        return Joi
            .object()
            .keys({
                roomName: Joi
                    .string()
                    .trim()
                    .min(MIN_LENGTH)
                    .max(MAX_LENGTH)
                    .required()
            });
    }
}
