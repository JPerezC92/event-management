
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AttendeeAttendInput {
    eventId: string;
}

export interface AttendeeUnattendInput {
    eventId: string;
}

export interface AttendeeCount {
    eventId: string;
}

export interface Credencials {
    email: string;
    password: string;
}

export interface EventInput {
    name: string;
    date: Date;
    time: Date;
    location: string;
    description: string;
}

export interface EventFindInput {
    id: string;
}

export interface EventUpdateInput {
    id: string;
    name?: Nullable<string>;
    date?: Nullable<Date>;
    time?: Nullable<Date>;
    location?: Nullable<string>;
    description?: Nullable<string>;
}

export interface EventSearchInput {
    page?: Nullable<number>;
    limit?: Nullable<number>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    userId?: Nullable<string>;
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

export interface Attendee {
    user: User;
    event: Event;
    createdAt: Date;
    updatedAt: Date;
}

export interface IQuery {
    attendeeCount(input: AttendeeCount): number | Promise<number>;
    whoami(): Nullable<User> | Promise<Nullable<User>>;
    eventFind(input: EventFindInput): Nullable<Event> | Promise<Nullable<Event>>;
    eventSearch(input?: Nullable<EventSearchInput>): Nullable<EventSearchResult> | Promise<Nullable<EventSearchResult>>;
    findUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    findAllUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface IMutation {
    attendeeAttend(input: AttendeeAttendInput): Attendee | Promise<Attendee>;
    attendeeUnattend(input: AttendeeUnattendInput): Attendee | Promise<Attendee>;
    login(input: Credencials): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    refreshToken(): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    eventCreate(input?: Nullable<EventInput>): Nullable<Event> | Promise<Nullable<Event>>;
    eventUpdate(input: EventUpdateInput): Nullable<Event> | Promise<Nullable<Event>>;
    eventDelete(id: string): Nullable<Event> | Promise<Nullable<Event>>;
    userCreate(input?: Nullable<UserCreate>): Nullable<User> | Promise<Nullable<User>>;
}

export interface AuthPayload {
    accessToken: string;
    refreshToken: string;
}

export interface Event {
    id: string;
    name: string;
    date: Date;
    time: Date;
    location: string;
    description: string;
}

export interface SearchInfo {
    pages: number;
    currentPage: number;
    prevPage?: Nullable<number>;
    nextPage?: Nullable<number>;
}

export interface EventSearchResult {
    info: SearchInfo;
    eventList: Nullable<Event>[];
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
