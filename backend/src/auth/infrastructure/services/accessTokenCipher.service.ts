import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccessPayload, TokenCipher } from '@/auth/domain';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenCipherService implements TokenCipher<AccessPayload> {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async encrypt(payload: AccessPayload): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: '10h',
        });
    }

    async decrypt(token: string): Promise<AccessPayload> {
        return await this.jwtService.verifyAsync<AccessPayload>(token, {
            secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        });
    }
}
