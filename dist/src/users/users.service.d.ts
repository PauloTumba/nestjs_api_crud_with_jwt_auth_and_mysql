import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOneByEmail(email: string): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    createUser2(data: CreateUserDto): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(data: CreateUserDto): Promise<{
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
    getUsers(): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUserById(id: string): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findOne(username: string): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUser(id: number, data: UpdateUserDto): Promise<{
        id: number;
        email: string;
        username: string | null;
        profile: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
