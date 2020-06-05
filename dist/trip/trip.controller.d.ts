import { TripService } from './trip.service';
import { TripDTO } from './trip.dto';
export declare class TripController {
    private tripService;
    constructor(tripService: TripService);
    deleteTrip(id: string): Promise<{
        deleted: boolean;
    }>;
    showAllTrips(): Promise<import("./trip.entity").TripEntity[]>;
    showTrip(id: string): Promise<import("./trip.entity").TripEntity>;
    createTrip(data: TripDTO): Promise<import("./trip.entity").TripEntity>;
    replaceTrip(id: string, data: TripDTO): Promise<import("./trip.entity").TripEntity>;
    updateTrip(id: string, data: Partial<TripDTO>): Promise<import("./trip.entity").TripEntity>;
}
