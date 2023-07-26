
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Credencials {
    email: string;
    password: string;
}

export interface UserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserBase {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
}

export interface AuthPayload {
    accessToken: string;
    refreshToken: string;
}

export interface IMutation {
    login(input: Credencials): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    createUser(input?: Nullable<UserCreate>): Nullable<User> | Promise<Nullable<User>>;
}

export interface IQuery {
    whoami(): Nullable<User> | Promise<Nullable<User>>;
    findUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    findAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface User extends UserBase {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    updatedAt: Date;
    createdAt: Date;
}

type Nullable<T> = T | null;
