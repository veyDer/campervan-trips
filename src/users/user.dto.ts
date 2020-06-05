import { IsNotEmpty } from 'class-validator'
import { ObjectID } from 'mongodb';

export class UserDTO {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}

export class UserResponse {
    id: ObjectID;
    username: string;
    created_at: Date;
    token?: string;
}