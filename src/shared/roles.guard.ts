import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import * as jwt from 'jsonwebtoken';

import { CONST } from "./const";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles_arr = [CONST.ROLE_USER, CONST.ROLE_MODERATOR, CONST.ROLE_ADMIN]

        const required_role = this.reflector.get<string>(CONST.ROLE, context.getHandler())
        if (!required_role) {
            return true
        }

        const required_role_index = roles_arr.indexOf(required_role)
        if (required_role_index < 0) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        if (!request.headers || !request.headers.authorization) {
            return false
        }
        
        const user:any = await this.validateToken(request.headers.authorization)

        if (!user || !user.roles || !user.roles.length) {
            return false
        }

        const user_role_index = user.roles.map(r => roles_arr.indexOf(r)).reduce((p,c) => Math.max(p,c))
        return user_role_index >= required_role_index

    }

    async validateToken(auth: string) {
        const auth_split = auth.split(' ')
        if (auth_split.length < 2 || auth_split[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
        }

        const token = auth_split[1]

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            return decoded
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
        }

        return true

    }
}