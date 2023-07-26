import { UserAuth } from './userAuth.model';

export interface AuthRepository {
    findUserByEmail(email: UserAuth['email']): Promise<UserAuth | null>;
    update(userAuth: UserAuth): Promise<UserAuth>;
}
