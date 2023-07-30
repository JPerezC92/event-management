import { Create } from '@/events/application';
import { Event } from '@/events/domain';
import { EventsStubRepository } from '@/events/infrastructure/repository';
import { UserNotFoundError } from '@/users/domain';
import {
    userStub1,
    usersStubRepository,
} from '@/users/infrastructure/repository';

describe('events/create use case', () => {
    test('should create a new event', async () => {
        // GIVEN
        const eventNew = {
            name: 'Event name',
            description: 'Event description',
            date: new Date(),
            location: 'Event location',
            time: new Date(),
        };

        const userId = userStub1.id;

        // WHEN
        const res = await Create(
            EventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventNew,
            userId,
        });

        // THEN
        expect(res).toBeInstanceOf(Event);
        expect(res).toMatchObject({ ...eventNew, userId });
    });

    test('should throw an error if user does not exist', async () => {
        // GIVEN
        const eventNew = {
            name: 'Event name',
            description: 'Event description',
            date: new Date(),
            location: 'Event location',
            time: new Date(),
        };

        const userId = 'invalid-user-id';

        // WHEN
        const res = Create(
            EventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventNew,
            userId,
        });

        // THEN
        await expect(res).rejects.toBeInstanceOf(UserNotFoundError);
    });
});
