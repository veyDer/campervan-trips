import { ObjectID } from "typeorm";
import { UserResponse } from "./user.dto";
export declare class UserEntity {
    id: ObjectID;
    created_at: Date;
    updated_at: Date;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<any>;
    toResponseObject(showToken?: boolean): UserResponse;
    private get token();
}
