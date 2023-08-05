import { Event } from '@/events/domain';
import { User } from '@/users/domain';

interface AttendeeProps {
    event: Event;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export class Attendee {
    readonly event: Event;
    readonly user: User;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(props: AttendeeProps) {
        this.event = props.event;
        this.user = props.user;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    static create(props: Pick<AttendeeProps, 'user' | 'event'>): Attendee {
        return new Attendee({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
