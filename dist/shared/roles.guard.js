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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const const_1 = require("./const");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles_arr = [const_1.CONST.ROLE_USER, const_1.CONST.ROLE_MODERATOR, const_1.CONST.ROLE_ADMIN];
        const required_role = this.reflector.get(const_1.CONST.ROLE, context.getHandler());
        if (!required_role) {
            return true;
        }
        const required_role_index = roles_arr.indexOf(required_role);
        if (required_role_index < 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        if (!request.headers || !request.headers.authorization) {
            return false;
        }
        const user = await this.validateToken(request.headers.authorization);
        if (!user || !user.roles || !user.roles.length) {
            return false;
        }
        const user_role_index = user.roles.map(r => roles_arr.indexOf(r)).reduce((p, c) => Math.max(p, c));
        return user_role_index >= required_role_index;
    }
    async validateToken(auth) {
        const auth_split = auth.split(' ');
        if (auth_split.length < 2 || auth_split[0] !== 'Bearer') {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
        const token = auth_split[1];
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        }
        catch (err) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
        return true;
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map