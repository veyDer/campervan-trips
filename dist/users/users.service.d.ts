import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO, UserResponse } from './user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    login(data: UserDTO): Promise<UserResponse>;
    register(data: UserDTO): Promise<UserResponse>;
    showAll(showToken?: boolean): Promise<UserResponse[]>;
}
