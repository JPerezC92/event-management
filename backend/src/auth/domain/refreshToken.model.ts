import { User } from '@/users/domain';

export interface RefreshPayload {
    email: User['email'];
    tokenId: string;
}
