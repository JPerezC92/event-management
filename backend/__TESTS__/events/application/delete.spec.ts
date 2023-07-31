import { Delete } from '@/events/application';
import {
    EventNotCreatedByUserError,
    EventNotFoundError,
} from '@/events/domain';
import {
    eventStub1,
    eventsStubRepository,
} from '@/events/infrastructure/repository';
import { UserNotFoundError } from '@/users/domain';
import {
    userStub1,
    userStub2,
    usersStubRepository,
} from '@/users/infrastructure/repository';

describe('events/delete use case', () => {
    test('should delete an event', async () => {
        // GIVEN
        const userId = userStub1.id;
        const eventId = eventStub1.id;

        // WHEN
        const res = await Delete(
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        expect(res).toMatchObject({
            id: eventId,
            name: eventStub1.name,
            description: eventStub1.description,
            date: eventStub1.date,
            location: eventStub1.location,
            userId: userStub1.id,
        });
    });

    test('should throw an error if the event does not exist', () => {
        // GIVEN
        const userId = userStub1.id;
        const eventId = 'fake-id';

        // WHEN
        const res = Delete(
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        expect(res).rejects.toThrowError(EventNotFoundError);
    });

    test('should throw an error if the user does not exist', () => {
        // GIVEN
        const userId = 'fake-id';
        const eventId = eventStub1.id;

        // WHEN
        const res = Delete(
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        expect(res).rejects.toThrowError(UserNotFoundError);
    });

    test('should throw an error if the user is not the owner of the event', () => {
        // GIVEN
        const userId = userStub2.id;
        const eventId = eventStub1.id;

        // WHEN
        const res = Delete(
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        expect(res).rejects.toThrowError(EventNotCreatedByUserError);
    });
});
