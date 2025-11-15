import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
    } | {
        success: boolean;
        message: string;
        user: {
            id: number;
            username: string | null;
            createdAt: Date;
        };
    }>;
    replace(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
