import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    showAllUsers(): Promise<import("./user.dto").UserResponse[]>;
    login(data: UserDTO): Promise<import("./user.dto").UserResponse>;
    register(data: UserDTO): Promise<import("./user.dto").UserResponse>;
}
