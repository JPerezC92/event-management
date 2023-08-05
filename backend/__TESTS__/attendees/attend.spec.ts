import { Attend } from '@/attendees/application/attend';
import { attendeesStubRepository } from '@/attendees/infrastructure/repository';
import { EventNotFoundError } from '@/events/domain';
import {
    eventStub1,
    eventStub2,
    eventsStubRepository,
} from '@/events/infrastructure/repository';
import {
    UserAlreadyParticipatingError,
    UserNotFoundError,
} from '@/users/domain';
import {
    userStub1,
    usersStubRepository,
} from '@/users/infrastructure/repository';

describe('attendees/attend use case', () => {
    test('should register a new attendee', async () => {
        // GIVEN
        const eventId = eventStub1.id;
        const userId = userStub1.id;

        // WHEN
        const res = await Attend(
            attendeesStubRepository(),
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        expect(res).toMatchObject({
            event: eventStub1,
            user: userStub1,
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date),
        });
    });

    test('should throw an error when event does not exist', async () => {
        // GIVEN
        const eventId = 'invalid-event-id';
        const userId = userStub1.id;

        // WHEN
        const res = Attend(
            attendeesStubRepository(),
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        await expect(res).rejects.toBeInstanceOf(EventNotFoundError);
    });

    test('should throw an error when user does not exist', async () => {
        // GIVEN
        const eventId = eventStub1.id;
        const userId = 'invalid-user-id';

        // WHEN
        const res = Attend(
            attendeesStubRepository(),
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        await expect(res).rejects.toBeInstanceOf(UserNotFoundError);
    });

    test('should throw an error when user is already attending', async () => {
        // GIVEN
        const eventId = eventStub2.id;
        const userId = userStub1.id;

        // WHEN
        const res = Attend(
            attendeesStubRepository(),
            eventsStubRepository(),
            usersStubRepository(),
        ).execute({
            eventId,
            userId,
        });

        // THEN
        await expect(res).rejects.toBeInstanceOf(UserAlreadyParticipatingError);
    });
});
