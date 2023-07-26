import * as crypto from 'crypto';

import { User } from '@/users/domain';
import { AccessPayload } from './accessPayload.model';
import { Authentication } from './authentication.model';
import { RefreshPayload } from './refreshToken.model';
import { TokenCipher } from './token.cipher';

interface UserAuthProps
    extends Pick<
        User,
        'id' | 'email' | 'password' | 'createdAt' | 'updatedAt'
    > {
    tokenList: Record<string, string>;
}

export class UserAuth implements UserAuthProps {
    id: string;
    email: string;
    password: string;
    updatedAt: Date;
    createdAt: Date;
    tokenList: Record<string, string>;

    constructor(props: UserAuthProps) {
        this.id = props.id;
        // this.firstName = props.firstName;
        // this.lastName = props.lastName;
        this.email = props.email;
        this.password = props.password;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
        this.tokenList = props.tokenList;
    }

    public accessPayload(): AccessPayload {
        return { userId: this.id, email: this.email };
    }

    public refreshPayload(): RefreshPayload {
        return { email: this.email, tokenId: crypto.randomUUID() };
    }

    public async authenticate(
        accessTokenCipher: TokenCipher<AccessPayload>,
        refreshTokenCipher: TokenCipher<RefreshPayload>,
        ip: string,
    ): Promise<Authentication> {
        this.tokenList[ip] = this.refreshPayload().tokenId;

        return new Authentication(
            await accessTokenCipher.encrypt(this.accessPayload()),
            await refreshTokenCipher.encrypt(this.refreshPayload()),
        );
    }
}
