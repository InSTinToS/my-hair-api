
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

export interface ReadBusinessesInput {
    ids?: Nullable<Nullable<string>[]>;
}

export interface ReadBusinessInput {
    id: string;
}

export interface CreateBusinessInput {
    name: string;
    thumbnail?: Nullable<string>;
    admins_ids: string[];
    locations?: Nullable<Nullable<LocationInput>[]>;
}

export interface UpdateBusinessInput {
    id: string;
    name?: Nullable<string>;
    thumbnail?: Nullable<string>;
    admins_ids?: Nullable<Nullable<string>[]>;
    locations?: Nullable<Nullable<LocationInput>[]>;
}

export interface DeleteBusinessInput {
    id: string;
}

export interface AddLocationsInput {
    businessId: string;
    locations: LocationInput[];
}

export interface DeleteLocationsInput {
    businessId: string;
    locationsIds: string[];
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
    id: string;
    link?: Nullable<string>;
    state: string;
    street: string;
    number: string;
    country: string;
    complement?: Nullable<string>;
}

export interface Business {
    id?: Nullable<string>;
    name: string;
    thumbnail?: Nullable<string>;
    locations?: Nullable<Nullable<Location>[]>;
    admins_ids: string[];
}

export interface IQuery {
    business(readBusinessInput: ReadBusinessInput): Nullable<Business> | Promise<Nullable<Business>>;
    businesses(readBusinessesInput?: Nullable<ReadBusinessesInput>): Nullable<Business>[] | Promise<Nullable<Business>[]>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(readUserInput?: Nullable<ReadUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    addLocations(addLocationsInput: AddLocationsInput): Business | Promise<Business>;
    deleteBusiness(deleteBusinessInput: DeleteBusinessInput): Business | Promise<Business>;
    createBusiness(createBusinessInput: CreateBusinessInput): Business | Promise<Business>;
    updateBusiness(updateBusinessInput: UpdateBusinessInput): Business | Promise<Business>;
    deleteLocations(deleteLocationsInput: DeleteLocationsInput): Business | Promise<Business>;
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
