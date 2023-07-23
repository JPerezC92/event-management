import { User } from './user.model';

export interface UsersRepository {
    save(user: User): Promise<User>;
    findById(id: User['id']): Promise<User | null>;
    findByEmail(email: User['email']): Promise<User | null>;
    findAll(): Promise<User[]>;
}
