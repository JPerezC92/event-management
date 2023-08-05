import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessPayload } from '@/auth/domain';
import { UnauthorizedException } from '@/shared/infrastructure/exceptions';
import { DatabaseService } from '@/shared/infrastructure/services';
import { EnvVariables } from '@/shared/infrastructure/utils';
import { User } from '@/users/domain';
import { usersPrismaRepository } from '@/users/infrastructure/repository';

const accessTokenStrategy = 'AccessTokenStrategy';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
    Strategy,
    accessTokenStrategy,
) {
    constructor(
        private readonly dbService: DatabaseService,
        configService: ConfigService<EnvVariables>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: AccessPayload): Promise<User> {
        const user = await this.dbService.$transaction((db) =>
            usersPrismaRepository(db).findByEmail(payload.email),
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

@Injectable()
export class JwtAccessGuard extends AuthGuard(accessTokenStrategy) {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getContext().req;
    }
}
