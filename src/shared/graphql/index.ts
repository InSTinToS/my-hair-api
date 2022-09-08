
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LocationInput {
    link?: Nullable<string>;
    state?: Nullable<string>;
    street?: Nullable<string>;
    number?: Nullable<string>;
    country?: Nullable<string>;
    complement?: Nullable<string>;
}

export interface CreateBusinessInput {
    name: string;
    admins_ids?: Nullable<Nullable<string>[]>;
    locations?: Nullable<Nullable<LocationInput>[]>;
}

export interface UpdateBusinessInput {
    name: string;
    admins_ids?: Nullable<Nullable<string>[]>;
    locations?: Nullable<Nullable<LocationInput>[]>;
}

export interface ReadUserInput {
    id?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
}

export interface CreateUserInput {
    email: string;
    username: string;
    password: string;
}

export interface DeleteUserInput {
    id: string;
}

export interface UpdateUserInput {
    id: string;
    email?: Nullable<string>;
    avatar?: Nullable<Bytes>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    full_name?: Nullable<string>;
}

export interface Location {
    link?: Nullable<string>;
    state?: Nullable<string>;
    street?: Nullable<string>;
    number?: Nullable<string>;
    country?: Nullable<string>;
    complement?: Nullable<string>;
}

export interface Business {
    id?: Nullable<string>;
    name: string;
    thumbnail?: Nullable<string>;
    admins_ids?: Nullable<Nullable<string>[]>;
    locations?: Nullable<Nullable<Location>[]>;
}

export interface IQuery {
    businesses(): Nullable<Business>[] | Promise<Nullable<Business>[]>;
    business(id: string): Nullable<Business> | Promise<Nullable<Business>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(readUserInput?: Nullable<ReadUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    removeBusiness(id: string): Nullable<Business> | Promise<Nullable<Business>>;
    createBusiness(createBusinessInput: CreateBusinessInput): Business | Promise<Business>;
    updateBusiness(updateBusinessInput: UpdateBusinessInput): Business | Promise<Business>;
    deleteUser(deleteUserInput: DeleteUserInput): User | Promise<User>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
}

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    created_at: DateTime;
    updated_at: DateTime;
    avatar?: Nullable<Bytes>;
    full_name?: Nullable<string>;
    businesses_ids?: Nullable<Nullable<string>[]>;
}

export type DateTime = any;
export type Bytes = any;
type Nullable<T> = T | null;
