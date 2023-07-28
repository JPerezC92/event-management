import { Whoami } from '@/auth/application/whoami';
import { UserNotFoundError } from '@/users/domain';
import {
    userStub1,
    userStubRepository,
} from '@/users/infrastructure/repository';
import { userEndpoint } from '@/users/infrastructure/schemas';

describe('auth/whoami use case', () => {
    test('should return the user', async () => {
        // GIVEN
        const userId = userStub1.id;

        // WHEN
        const res = await Whoami(
            userStubRepository(),
            userEndpoint.parse,
        ).execute({ userId });

        // THEN
        expect(res).toEqual({
            id: userStub1.id,
            email: userStub1.email,
            firstName: userStub1.firstName,
            lastName: userStub1.lastName,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    test('should throw an error if the user does not exist', async () => {
        // GIVEN
        const userId = 'userNotExists';

        // WHEN
        const res = Whoami(userStubRepository(), userEndpoint.parse).execute({
            userId,
        });

        // THEN
        expect(res).rejects.toThrow();
        expect(res).rejects.toBeInstanceOf(UserNotFoundError);
    });
});
