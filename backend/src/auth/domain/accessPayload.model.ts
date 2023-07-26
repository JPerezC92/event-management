import { User } from '@/users/domain';

export interface AccessPayload {
    userId: User['id'];
    email: User['email'];
}
