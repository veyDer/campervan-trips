import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {

    }

    async login(user:any): Promise<any> {
        const payload = {username: user.username, sub: user.userId}

        return {
            access_token: this.jwtService.sign(payload),
            
        }
    }
}
