import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DateScalar } from '../scalars/date.scalar';
import { ObjectIdScalar } from '../scalars/object-id.scalar';

import { ConfigModule } from '../config/config.module';

import { UsersModule } from '../users/users.module';

import { TripSchema } from './schemas/trip.schema';

import { TripService } from './trip.service';
import { TripResolver } from './trip.resolver';

import { WaypointModule } from '../waypoint/waypoint.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Trip', schema: TripSchema }]),
      ConfigModule,
      forwardRef(() => UsersModule),
      WaypointModule
    ],
    exports: [TripService],
    controllers: [],
    providers: [TripService, TripResolver, DateScalar, ObjectIdScalar],
  })
  export class TripModule {}
  