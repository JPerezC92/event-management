import {
    BcryptPasswordCipherService,
    DatabaseService,
} from '@/shared/infrastructure/services';
import { Module } from '@nestjs/common';

@Module({
    providers: [DatabaseService, BcryptPasswordCipherService],
    exports: [DatabaseService, BcryptPasswordCipherService],
})
export class SharedModule {}
