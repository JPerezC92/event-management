import { PasswordCipher } from '@/shared/domain';
import * as crypto from 'crypto';

interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    updatedAt: Date;
    createdAt: Date;
}

export class User implements UserProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    updatedAt: Date;
    createdAt: Date;

    constructor(props: UserProps) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.password = props.password;
        this.updatedAt = props.updatedAt;
        this.createdAt = props.createdAt;
    }

    static async create(
        props: Pick<UserProps, 'firstName' | 'lastName' | 'email' | 'password'>,
        passwordCipher: PasswordCipher,
    ): Promise<User> {
        return new User({
            ...props,
            id: crypto.randomUUID(),
            password: await passwordCipher.hash(props.password),
            updatedAt: new Date(),
            createdAt: new Date(),
        });
    }
}
