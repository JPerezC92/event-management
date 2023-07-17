import { User } from './user.model';

export interface UsersRepository {
    create(user: User): Promise<User>;
    findById(id: User['id']): Promise<User | null>;
    findAll(): Promise<User[]>;
}
