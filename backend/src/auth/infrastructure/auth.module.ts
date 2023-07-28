import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtRefreshStrategy } from '@/auth/infrastructure/guards';
import { JwtAccessStrategy } from '@/auth/infrastructure/guards/JwtAccessStrategy.guard';
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
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
    exports: [
        AccessTokenCipherService,
        RefreshTokenCipherService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
    ],
})
export class AuthModule {}
