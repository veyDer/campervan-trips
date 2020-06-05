import { Controller, Get, Post, Put, Delete, Body, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';

import { TripService } from './trip.service';
import { TripDTO } from './trip.dto';

@Controller('api/trip')
export class TripController {
    constructor(
        private tripService: TripService
    ){}

    @Delete(':id')
    deleteTrip(
        @Param('id') id: string
    ) {
        return this.tripService.removeTrip(id)
    }


    @Get()
    showAllTrips() {
        return this.tripService.showAll()
    }

    @Get(':id')
    showTrip(
        @Param('id') id: string
    ) {
        return this.tripService.findTrip(id)
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    createTrip(
        @Body() data: TripDTO
    ) {
        return this.tripService.create(data)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({transform: true}))
    replaceTrip(
        @Param('id') id: string,
        @Body() data: TripDTO
    ) {
        return this.tripService.update(id, data)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({transform: true}))
    updateTrip(
        @Param('id') id: string,
        @Body() data: Partial<TripDTO>
    ) {
        return this.tripService.update(id, data)
    }


}
