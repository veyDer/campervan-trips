import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ObjectIdScalar } from '../scalars/object-id.scalar';

import { ConfigModule } from '../config/config.module';

import { UsersModule } from '../users/users.module';

import { WaypointSchema } from './schemas/waypoint.schema';

import { WaypointService } from './waypoint.service';
import { WaypointResolver } from './waypoint.resolver';


@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Waypoint', schema: WaypointSchema }]),
      ConfigModule,
      forwardRef(() => UsersModule),
    ],
    exports: [WaypointService],
    controllers: [],
    providers: [WaypointService, WaypointResolver, ObjectIdScalar],
  })
  export class WaypointModule {}
  