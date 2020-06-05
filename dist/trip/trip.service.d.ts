import { Repository } from 'typeorm';
import { TripEntity } from './trip.entity';
import { TripDTO } from './trip.dto';
export declare class TripService {
    private tripRepository;
    constructor(tripRepository: Repository<TripEntity>);
    create(data: TripDTO): Promise<TripEntity>;
    findTrip(id: string): Promise<TripEntity>;
    removeTrip(id: string): Promise<{
        deleted: boolean;
    }>;
    showAll(): Promise<TripEntity[]>;
    update(id: string, data: Partial<TripDTO>): Promise<TripEntity>;
    private toObjectId;
}
