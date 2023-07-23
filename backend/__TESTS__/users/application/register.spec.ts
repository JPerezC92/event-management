import { BcryptPasswordCipherService } from '@/shared/infrastructure/services';
import { Register } from '@/users/application/register';
import { EmailAlreadyInUseError } from '@/users/domain';
import {
    userStub1,
    userStubRepository,
} from '@/users/infrastructure/repository';
import { userEndpoint } from '@/users/infrastructure/schemas';

const userCreate = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    confirmPassword: '123456aA-',
    password: '123456aA-',
};

describe('users/register use case', () => {
    test('should register a new user', async () => {
        // GIVEN userCreate

        // WHEN
        const res = await Register(
            userStubRepository(),
            new BcryptPasswordCipherService(),
            userEndpoint.parse,
        ).execute({ userCreate });

        // THEN
        expect(res).toEqual({
            firstName: userCreate.firstName,
            lastName: userCreate.lastName,
            email: userCreate.email,

            id: expect.any(String),
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date),
        });
    });

    test('should not register a new user with registered email', () => {
        // GIVEN userCreate

        // WHEN
        const res = Register(
            userStubRepository(),
            new BcryptPasswordCipherService(),
            userEndpoint.parse,
        ).execute({ userCreate: { ...userCreate, email: userStub1.email } });

        // THEN
        expect(res).rejects.toThrowError();
        expect(res).rejects.toBeInstanceOf(EmailAlreadyInUseError);
    });
});
