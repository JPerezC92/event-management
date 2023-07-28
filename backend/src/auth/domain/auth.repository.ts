import { UserAuth } from './userAuth.model';

export interface AuthRepository {
    findUserByEmail(email: UserAuth['email']): Promise<UserAuth | null>;
    findById(id: UserAuth['id']): Promise<UserAuth | null>;
    update(userAuth: UserAuth): Promise<UserAuth>;
}
