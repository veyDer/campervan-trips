import { ObjectID } from 'mongodb';
export declare class UserDTO {
    username: string;
    password: string;
}
export declare class UserResponse {
    id: ObjectID;
    username: string;
    created_at: Date;
    token?: string;
}
