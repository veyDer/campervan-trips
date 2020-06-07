import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DateScalar } from '../scalars/date.scalar';
import { ObjectIdScalar } from '../scalars/object-id.scalar';

import { UsersService } from './users.service';

import { AuthModule } from '../auth/auth.module';

import { ConfigModule } from '../config/config.module';

import { UserSchema } from './schemas/user.schema';
import { UserResolver } from './users.resolvers';
import { TripModule } from '../trip/trip.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TripModule),
  ],
  exports: [UsersService],
  controllers: [],
  providers: [UsersService, UserResolver, DateScalar, ObjectIdScalar],
})
export class UsersModule {}
