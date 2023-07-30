import { User } from '@/users/domain';
import * as crypto from 'crypto';

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
}
