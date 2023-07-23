import { Adapter, UseCase } from '@/shared/application';
import { PasswordCipher } from '@/shared/domain';
import { EmailAlreadyInUseError, User, UsersRepository } from '@/users/domain';

interface RegisterInput {
    userCreate: Parameters<(typeof User)['create']>[0] & {
        confirmPassword: string;
    };
}

export function Register<T>(
    usersRepository: UsersRepository,
    passwordCipher: PasswordCipher,
    outAdapter: Adapter<User, T>,
): UseCase<T, RegisterInput> {
    return {
        /**
         * @throws { EmailAlreadyInUseError }
         */
        async execute({ userCreate }) {
            const userExists = await usersRepository.findByEmail(
                userCreate.email,
            );

            if (userExists) throw new EmailAlreadyInUseError(userCreate.email);

            const user = await User.create(userCreate, passwordCipher);

            await usersRepository.save(user);

            return outAdapter(user);
        },
    };
}
