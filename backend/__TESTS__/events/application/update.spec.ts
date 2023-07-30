import { Update } from '@/events/application';
import {
    EventNotCreatedByUserError,
    EventNotFoundError,
} from '@/events/domain';
import {
    EventsStubRepository,
    eventStub1,
} from '@/events/infrastructure/repository';
import { UserNotFoundError } from '@/users/domain';
import {
    userStub2,
    usersStubRepository,
} from '@/users/infrastructure/repository';

describe('events/update use case', () => {
    test('should update an event', async () => {
        // GIVEN
        const userId = eventStub1.userId;
        const eventUpdate = {
            id: eventStub1.id,
            name: 'new name',
            description: 'new description',
            date: new Date(),
            location: 'new location',
        };

        // WHEN
        const event = await Update(
            EventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventUpdate,
            userId,
        });

        // THEN
        expect(event).toMatchObject(eventUpdate);
    });

    test('should throw an error when the event does not exist', async () => {
        // GIVEN
        const userId = eventStub1.userId;
        const eventUpdate = {
            id: 'not-exist',
            name: 'new name',
            description: 'new description',
            date: new Date(),
            location: 'new location',
        };

        // WHEN
        const event = Update(
            EventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventUpdate,
            userId,
        });

        // THEN
        expect(event).rejects.toBeInstanceOf(EventNotFoundError);
    });

    test('should throw an error when the user does not exist', async () => {
        // GIVEN
        const userId = 'not-exist';
        const eventUpdate = {
            id: eventStub1.id,
            name: 'new name',
            description: 'new description',
            date: new Date(),
            location: 'new location',
        };

        // WHEN
        const event = Update(
            EventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventUpdate,
            userId,
        });

        // THEN
        expect(event).rejects.toBeInstanceOf(UserNotFoundError);
    });

    test('should throw an error when the user is not the owner of the event', async () => {
        // GIVEN
        const userId = userStub2.id;
        const eventUpdate = {
            id: eventStub1.id,
            name: 'new name',
            description: 'new description',
            date: new Date(),
            location: 'new location',
        };

        // WHEN
        const event = Update(
            EventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventUpdate,
            userId,
        });

        // THEN
        expect(event).rejects.toBeInstanceOf(EventNotCreatedByUserError);
    });
});
