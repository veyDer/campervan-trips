"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trip_entity_1 = require("./trip.entity");
const mongodb_1 = require("mongodb");
let TripService = class TripService {
    constructor(tripRepository) {
        this.tripRepository = tripRepository;
    }
    async create(data) {
        const trip = this.tripRepository.create(data);
        await this.tripRepository.save(trip);
        return trip;
    }
    async findTrip(id) {
        const trip = await this.tripRepository.findOne({ where: { _id: this.toObjectId(id) } });
        if (!trip) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return trip;
    }
    async removeTrip(id) {
        await this.tripRepository.delete({ id });
        return { deleted: true };
    }
    async showAll() {
        return await this.tripRepository.find();
    }
    async update(id, data) {
        await this.tripRepository.update({ id: this.toObjectId(id) }, data);
        return await this.findTrip(id);
    }
    toObjectId(value) {
        let res;
        try {
            res = typeof value === 'string' ? new mongodb_1.ObjectID(value) : value;
        }
        catch (error) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return res;
    }
};
TripService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(trip_entity_1.TripEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TripService);
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map