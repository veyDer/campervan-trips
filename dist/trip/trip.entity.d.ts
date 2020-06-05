import { ObjectID } from "typeorm";
export declare class TripEntity {
    id: ObjectID;
    created_at: Date;
    updated_at?: Date;
    name: string;
    description: string;
}
