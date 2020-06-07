import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { WaypointService } from './waypoint.service';
import { Waypoint } from '../graphql.classes';
import { UserDocument } from '../users/schemas/user.schema';

@Resolver('Waypoint')
export class WaypointResolver {
  constructor(private usersService: UsersService, private tripService: WaypointService) {}

  @ResolveProperty()
  async addedBy(@Parent() wp: Waypoint): Promise<UserDocument | null> {
    if (!wp.addedBy) return null;
    return this.usersService.findOne({_id: wp.addedBy})
  }
}
