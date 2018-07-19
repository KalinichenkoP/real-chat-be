import {PipeTransform, BadRequestException, Injectable} from '@nestjs/common';
import { AnySchema } from "joi";
import * as Joi from "joi";

import { Factory } from "../../interfaces/Factory";
import { CreateSchema } from "../schemas/CreateSchemaFactory";

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform<T> {
    private readonly factory: Factory<T>;
    private readonly schema: AnySchema;

    constructor(schemaFactory: CreateSchema, factory?: Factory<T>) {
        this.schema = schemaFactory.createSchema();

        if (factory) {
            this.factory = factory;
        }
    }

    transform(value: T): T {
        const result = Joi.validate(value, this.schema);

        if (result.error) {
            throw new BadRequestException(result.error);
        }

        if (this.factory) {
            return this.factory.create(result.value);
        }

        return result.value;
    }
}
