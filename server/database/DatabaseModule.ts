import { Module } from '@nestjs/common';
import { databaseProviders } from './DatabaseProviders';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
