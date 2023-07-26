import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UnauthorizedException } from '@/shared/infrastructure/exceptions';
import { User } from '@/users/domain';

export const UserFromReq = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): User => {
        const request = GqlExecutionContext.create(ctx).getContext().req;

        if (!User.isInstance(request?.user)) throw new UnauthorizedException();

        return request.user;
    },
);
