import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { TripEntity } from './trip.entity';
import { TripDTO } from './trip.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class TripService {
    constructor(
        @InjectRepository(TripEntity)
        private tripRepository: Repository<TripEntity>
    ){}

    async create(data: TripDTO) {
        const trip = this.tripRepository.create(data)
        await this.tripRepository.save(trip)
        return trip
    }

    async findTrip(id: string) {
        const trip = await this.tripRepository.findOne({where: {_id: this.toObjectId(id)}})
        if (!trip) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
        return trip
    }

    async removeTrip(id: string) {
        await this.tripRepository.delete({id})
        return { deleted: true }
    }
    
    async showAll() {
        return await this.tripRepository.find()
    }

    async update(id: string, data: Partial<TripDTO>) {
        await this.tripRepository.update({id: this.toObjectId(id)}, data)
        return await this.findTrip(id)
    }

    private toObjectId(value: string | ObjectID): ObjectID {
        let res: (string | ObjectID)
        try {
            res = typeof value === 'string' ? new ObjectID(value) : value
        } catch (error) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
        return res
    }

}
