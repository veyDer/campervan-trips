import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ConfigService } from '../config/config.service';

import { WaypointDocument } from './schemas/waypoint.schema';

@Injectable()
export class WaypointService {
    constructor(
        @InjectModel('Waypoint') private readonly waypointModel: Model<WaypointDocument>,
        private configService: ConfigService
      ) {}

    async find(query: any): Promise<WaypointDocument[] | undefined> {
        return this.waypointModel.find(query).exec()
    }

    async findOne(query: any): Promise<WaypointDocument | null> {
        return this.waypointModel.findOne(query).exec()
    }

}
