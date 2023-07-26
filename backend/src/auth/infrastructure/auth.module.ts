import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SharedModule } from '@/shared/infrastructure';
import { ConfigModule } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';
import {
    AccessTokenCipherService,
    AuthService,
    RefreshTokenCipherService,
} from './services';

@Module({
    imports: [JwtModule, ConfigModule, SharedModule],
    providers: [
        AuthResolver,
        AuthService,
        AccessTokenCipherService,
        RefreshTokenCipherService,
    ],
    exports: [AccessTokenCipherService, RefreshTokenCipherService],
})
export class AuthModule {}
