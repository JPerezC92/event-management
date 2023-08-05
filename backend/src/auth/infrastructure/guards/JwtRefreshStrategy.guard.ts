import { RefreshPayload } from '@/auth/domain';
import { DatabaseService } from '@/shared/infrastructure/services';
import { EnvVariables } from '@/shared/infrastructure/utils';
import { User } from '@/users/domain';
import { usersPrismaRepository } from '@/users/infrastructure/repository';
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import * as ip from 'ip';
import { ExtractJwt, Strategy } from 'passport-jwt';

const refreshTokenStrategy = 'RefreshTokenStrategy';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    refreshTokenStrategy,
) {
    constructor(
        private readonly prismaService: DatabaseService,
        readonly _configService: ConfigService<EnvVariables>,
    ) {
        super({
            passReqToCallback: true,
            jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
            ignoreExpiration: false,
            secretOrKey: _configService.get('JWT_REFRESH_TOKEN_SECRET'),
        });
    }

    async validate(_req: Request, payload: RefreshPayload): Promise<User> {
        const user = await this.prismaService.$transaction((db) =>
            usersPrismaRepository(db).findByEmail(payload.email),
        );
        console.log(
            user?.tokenList[ip.address()],
            'user?.tokenList[ip.address()]',
        );
        console.log(payload.tokenId, 'payload.tokenId');
        if (!user || user?.tokenList[ip.address()] !== payload.tokenId) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(refreshTokenStrategy) {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }
}
