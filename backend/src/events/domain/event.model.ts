import * as crypto from 'crypto';

import { User } from '@/users/domain';

interface EventProps {
    id: string;
    name: string;
    date: Date;
    time: Date;
    location: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
    userId: User['id'];
}

export class Event implements EventProps {
    id: string;
    name: string;
    date: Date;
    time: Date;
    location: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
    userId: string;

    constructor(props: EventProps) {
        this.id = props.id;
        this.name = props.name;
        this.date = props.date;
        this.time = props.time;
        this.location = props.location;
        this.description = props.description;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
        this.userId = props.userId;
    }

    static create(
        props: Pick<
            EventProps,
            'name' | 'date' | 'time' | 'location' | 'description' | 'userId'
        >,
    ) {
        return new Event({
            ...props,
            id: crypto.randomUUID(),
            updatedAt: new Date(),
            createdAt: new Date(),
        });
    }

    update(
        props: { id: Event['id'] } & Partial<
            Pick<
                EventProps,
                'name' | 'date' | 'time' | 'location' | 'description'
            >
        >,
    ) {
        return new Event({
            ...this,
            ...props,
            updatedAt: new Date(),
        });
    }

    isCreatedBy(user: User) {
        return this.userId === user.id;
    }
}
