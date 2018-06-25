import { Module } from '@nestjs/common';
import { databaseProviders } from './DatabaseProviders';

@Module({
    components: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
