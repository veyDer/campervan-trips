import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TripDocument } from './schemas/trip.schema';
import { ConfigService } from '../config/config.service';
import { AddTripInput } from '../graphql.classes';

@Injectable()
export class TripService {
    constructor(
        @InjectModel('Trip') private readonly tripModel: Model<TripDocument>,
        private configService: ConfigService
      ) {}

    async findAll(query: any): Promise<TripDocument[] | undefined> {
        const trips = await this.tripModel.find(query).exec();
        return trips;
    }

    async findOne(query: any): Promise<TripDocument | null> {
        return await this.tripModel.findOne(query).exec()
    }

    async addTrip(data: AddTripInput): Promise<TripDocument> {
        // replace data.users (from AddTripInput) with data.ownedBy (from TripDocument)
        const params = {}
        delete Object.assign(params, data, {ownedBy: data.users}).users
        
        const createdTrip = new this.tripModel(params);
        const trip = await createdTrip.save()

        return trip
    }
}
