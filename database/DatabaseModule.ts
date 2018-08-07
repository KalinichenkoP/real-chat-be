import { Module } from '@nestjs/common';
import { databaseProviders } from './DatabaseProviders';
import {ConfigModule} from '../models/config/ConfigModule';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
