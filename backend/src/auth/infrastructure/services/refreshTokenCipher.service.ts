import { RefreshPayload, TokenCipher } from '@/auth/domain';
import { EnvVariables } from '@/shared/infrastructure/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenCipherService implements TokenCipher<RefreshPayload> {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvVariables>,
    ) {}

    async encrypt(payload: RefreshPayload): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: '30d',
        });
    }

    async decrypt(token: string): Promise<RefreshPayload> {
        return await this.jwtService.verifyAsync<RefreshPayload>(token, {
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        });
    }
}
