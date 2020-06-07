import { Resolver, ResolveProperty, Parent, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { TripService } from './trip.service';
import { Trip, AddTripInput } from '../graphql.classes';
import { UserDocument } from '../users/schemas/user.schema';
import { WaypointDocument } from '../waypoint/schemas/waypoint.schema';
import { WaypointService } from '../waypoint/waypoint.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TripDocument } from './schemas/trip.schema';
import { ObjectIdScalar } from '../scalars/object-id.scalar';

@Resolver('Trip')
export class TripResolver {
  constructor(
    private tripService: TripService,
    private usersService: UsersService,
    private wpService: WaypointService
    ) {}

  @Query('trips')
  @UseGuards(JwtAuthGuard)
  async trips(
    @Context('req') request: any,
    @Args('user') userId?: ObjectIdScalar,
  ): Promise<TripDocument[] | undefined> {
    if (!userId) {
      if (!request.user) {
        return [];
      }
      userId = request.user._id
    }
    const user = await this.usersService.findOne({_id: userId})
    if (!user) return []
    return await this.tripService.findAll({ownedBy: userId})
  }

  @ResolveProperty()
  async ownedBy(@Parent() trip: Trip): Promise<UserDocument[] | undefined> {
    return this.usersService.find({_id:{$in: trip.ownedBy}})
  }

  @ResolveProperty()
  async waypoints(@Parent() trip: Trip): Promise<WaypointDocument[] | undefined> {
    return this.wpService.find({_id: {$in: trip.waypoints}})
  }

  @Mutation('addTrip')
  @UseGuards(JwtAuthGuard)
  async addTrip(
    @Context('req') request: any,
    @Args('data') data: AddTripInput
  ): Promise<TripDocument> {
    if (!Array.isArray(data.users)) {
      data.users = []
    }
    if (!data.users.length && request.user) {
      data.users.push(request.user._id)
    }
    const res = await this.tripService.addTrip(data)
    return res
  }

  @Mutation('deleteTrip')
  @UseGuards(JwtAuthGuard)
  async deleteTrip(
    @Context('req') request: any,
    @Args('id') tripId: ObjectIdScalar
  ): Promise<boolean> {
    const trip = await this.tripService.findOne({_id: tripId})
    if (!trip) return false
    if (trip.ownedBy.indexOf(request.user._id) === -1) {
      return false
    }
    await trip.remove()
    return true
  }
}
