import { IsString } from 'class-validator'

export class TripDTO {
    @IsString()
    name: string;

    @IsString()
    description: string
}