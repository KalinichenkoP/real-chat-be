import * as revalidator from 'revalidator';
import {ValidationSchema, ValidationDescriptor} from "../interfaces/ValidationSchema";
import {VALIDATION_SCHEMAS} from './constants';
import * as mime from 'mime-types';
import * as fs from 'fs';
import * as mmm from 'mmmagic';

// on server we only validate what is hard to validate on client

export default class Validator {
    private static async detectMimeType (path: string) : Promise<string> {
        let Magic = mmm.Magic;
        let magic = new Magic(mmm.MAGIC_MIME_TYPE);

        return new Promise<string> ((resolve, reject) => {
            magic.detectFile(path, (err: Error, result: string) => {
                return (err)
                    ? reject(err)
                    : resolve(result);
            });
        });

    }

    private static async validateFileSize (path: string, size: number) : Promise<ValidationDescriptor> {
        return new Promise<ValidationDescriptor> ((resolve, reject) => {
            try {
                let isValid = fs.statSync(path).size < size;
                let descriptor = {
                    valid: isValid,
                    reason: (!isValid)
                        ? `maximum size is ${size}` : ''
                };
                return resolve(descriptor);
            } catch (err) {
                return reject(err);
            }
        });
    }

    private static async validateMimeType (path: string, allowedTypes: string[]) : Promise<ValidationDescriptor> {
        return new Promise<ValidationDescriptor> (async (resolve, reject) => {
            try {
                let realFileType = await Validator.detectMimeType(path);
                let isValid = allowedTypes.includes(realFileType);
                let descriptor = {
                    valid: isValid,
                    reason: (!isValid)
                        ? 'file type is incorrect' : ''
                };
                return resolve(descriptor);
            } catch (err) {
                return reject(err);
            }
        });
    }

    private static combine (descriptors: ValidationDescriptor[]) : ValidationDescriptor {
        let isValidCombined = descriptors
            .map((descriptor) => descriptor.valid)
            .reduce((prev, curr) => prev && curr);

        let reasonCombined = descriptors
            .map((descriptor) => descriptor.reason)
            .filter((reason) => reason.length)
            .join('; ');

        return {
            valid: isValidCombined,
            reason: reasonCombined
        };
    }

    private static schemas: ValidationSchema[] = [
        {
            type: VALIDATION_SCHEMAS.IMAGE,
            validator: async (path: string) : Promise<ValidationDescriptor> => {
                return Validator.combine([
                    await Validator.validateFileSize(path, 5242880),
                    await Validator.validateMimeType(path, ['image/jpeg', 'image/png'])
                ]);
            }
        },
        {
            type: VALIDATION_SCHEMAS.RICH_DOCUMENT,
            validator: async (path: string) : Promise<ValidationDescriptor> => {
                return Validator.combine([
                    await Validator.validateFileSize(path, 10485760),
                    await Validator.validateMimeType(path, [
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/pdf'
                    ])
                ]);
            }
        },
        {
            type: VALIDATION_SCHEMAS.TEXT_DOCUMENT,
            validator: async (path: string) : Promise<ValidationDescriptor> => {
                return Validator.combine([
                    await Validator.validateFileSize(path, 1048576),
                    await Validator.validateMimeType(path, [
                        'text/plain',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ])
                ]);
            }
        }
    ];

    public static async check (object: any, schemaType: number) : Promise<ValidationDescriptor> {
        let appropriateSchemas = Validator.schemas
            .filter((schema: ValidationSchema) => {
                return schema.type === schemaType;
            });

        if (appropriateSchemas.length !== 1) {
            return {
                valid: false,
                reason: 'schema not determined'
            }
        }

        return appropriateSchemas[0].validator(object);
    }
}
