import { Controller, Post, Get, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    showAllUsers() {
        return this.userService.showAll(false)
    }

    @Post('login')
    @UsePipes(new ValidationPipe({transform: true}))
    login(@Body() data: UserDTO) {
        return this.userService.login(data)
    }

    @Post('register')
    @UsePipes(new ValidationPipe({transform: true}))
    register(@Body() data: UserDTO) {
        return this.userService.register(data)
    }
}
