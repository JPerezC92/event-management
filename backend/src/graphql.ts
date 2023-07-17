
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserBase {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
}

export class User implements UserBase {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export abstract class IMutation {
    abstract createUser(lastName: string, email: string, password: string, firstName: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    abstract findUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract findAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

type Nullable<T> = T | null;
