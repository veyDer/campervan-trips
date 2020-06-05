import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserDTO, UserResponse } from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async login(data: UserDTO): Promise<UserResponse> {
        const {username, password} = data
        const user = await this.userRepository.findOne({where: {username}})
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject(true)
    }
    async register(data: UserDTO): Promise<UserResponse> {
        const {username} = data
        let user = await this.userRepository.findOne({where:{username}})
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }
        user = await this.userRepository.create(data)
        await this.userRepository.save(user)
        return user.toResponseObject()
    }

    async showAll(showToken = false): Promise<UserResponse[]> {
        const users = await this.userRepository.find()
        return users.map(user => user.toResponseObject(showToken))
    }
}
