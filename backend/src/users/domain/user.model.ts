import * as crypto from 'crypto';

interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class User implements UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(props: UserProps) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
    }

    static create(
        props: Pick<UserProps, 'firstName' | 'lastName' | 'email'>,
    ): User {
        return new User({ id: crypto.randomUUID(), ...props });
    }
}
