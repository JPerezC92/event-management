import { DatabaseService } from '@/shared/infrastructure/services';
import { Module } from '@nestjs/common';

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class SharedModule {}
