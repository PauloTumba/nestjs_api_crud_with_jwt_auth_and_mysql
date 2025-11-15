import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        username: any;
        profile: any;
        access_token: string;
    }>;
    getProfile(req: any): any;
}
