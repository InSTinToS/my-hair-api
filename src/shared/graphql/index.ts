
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateBusinessInput {
    name?: Nullable<string>;
    admins_ids?: Nullable<Nullable<string>[]>;
}

export interface UpdateBusinessInput {
    id: string;
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

export interface Business {
    id?: Nullable<string>;
    name: string;
    admins?: Nullable<Nullable<User>[]>;
}

export interface IQuery {
    business(): Nullable<Business>[] | Promise<Nullable<Business>[]>;
    businesses(id: string): Nullable<Business> | Promise<Nullable<Business>>;
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
    users?: Nullable<Nullable<Business>[]>;
}

export type DateTime = any;
export type Bytes = any;
type Nullable<T> = T | null;
