import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {Injectable} from "@nestjs/common";

@Injectable()
export class ConfigService {
    private readonly envConfig: { [prop: string]: string };

    constructor(filePath: string) {
        console.log('service constructor');
        console.log(filePath);
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        // console.log(this.envConfig);
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
