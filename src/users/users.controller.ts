import { Controller, Post, Get, Body, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { RequiredRole } from 'src/shared/required-role.decorator';
import { RolesGuard } from 'src/shared/roles.guard';
import { CONST } from 'src/shared/const';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @RequiredRole(CONST.ROLE_USER)
    @UseGuards(RolesGuard)
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
