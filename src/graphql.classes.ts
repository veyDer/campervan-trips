
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum EContentType {
    COMMENT = "COMMENT",
    PHOTO = "PHOTO",
    VIDEO = "VIDEO"
}

export class AddContentInput {
    type: EContentType;
    content: string;
}

export class AddTripInput {
    name: string;
    users?: ObjectId[];
    startDate?: Date;
    endDate?: Date;
}

export class CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export class LoginUserInput {
    username?: string;
    email?: string;
    password: string;
}

export class UpdateContentInput {
    id: ObjectId;
    content: string;
}

export class UpdatePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export class UpdateTripInput {
    name?: string;
    users?: ObjectId[];
    startDate?: Date;
    endDate?: Date;
}

export class UpdateUserInput {
    username?: string;
    email?: string;
    password?: UpdatePasswordInput;
    enabled?: boolean;
}

export interface IContentable {
    comments: Content[];
    photos: Content[];
    videos: Content[];
}

export class Content {
    _id: ObjectId;
    type: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
}

export class GeoJSONPoint {
    type: string;
    coordinates: number[];
}

export class LoginResult {
    user: User;
    token: string;
}

export abstract class IMutation {
    abstract addPostContent(post: ObjectId, data: AddContentInput): Content | Promise<Content>;

    abstract addWaypointComment(waypoint: ObjectId, data: AddContentInput): Content | Promise<Content>;

    abstract updateContent(id: ObjectId, content: string): Content | Promise<Content>;

    abstract deleteContent(id: ObjectId): boolean | Promise<boolean>;

    abstract addTrip(data: AddTripInput): Trip | Promise<Trip>;

    abstract updateTrip(trip: ObjectId, data: UpdateTripInput): Trip | Promise<Trip>;

    abstract deleteTrip(id: ObjectId): boolean | Promise<boolean>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract updateUser(fieldsToUpdate: UpdateUserInput, username?: string): User | Promise<User>;

    abstract addAdminPermission(username: string): User | Promise<User>;

    abstract removeAdminPermission(username: string): User | Promise<User>;

    abstract resetPassword(username: string, code: string, password: string): User | Promise<User>;
}

export class Post implements IContentable {
    comments: Content[];
    photos: Content[];
    videos: Content[];
    _id: ObjectId;
    author: User;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

export abstract class IQuery {
    abstract login(user: LoginUserInput): LoginResult | Promise<LoginResult>;

    abstract refreshToken(): string | Promise<string>;

    abstract getPostContent(post: ObjectId, type: EContentType): Content[] | Promise<Content[]>;

    abstract getWaypointContent(waypoint: ObjectId, type: EContentType): Content[] | Promise<Content[]>;

    abstract trips(user?: ObjectId): Trip[] | Promise<Trip[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(username?: string, email?: string): User | Promise<User>;

    abstract forgotPassword(email?: string): boolean | Promise<boolean>;
}

export class Trip {
    journal: Post[];
    _id: ObjectId;
    name: string;
    ownedBy: User[];
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    waypoints: Waypoint[];
}

export class User {
    trips: Trip[];
    username: string;
    email: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
    lastSeenAt: Date;
    enabled: boolean;
    _id: ObjectId;
}

export class Waypoint implements IContentable {
    comments: Content[];
    photos: Content[];
    videos: Content[];
    coords: GeoJSONPoint;
    _id: ObjectId;
    poi: boolean;
    name?: string;
    description?: string;
    addedBy?: User;
}

export type ObjectId = any;
