import { Controller, Post, Body, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN SEM GUARD
  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }

  // ROTA PROTEGIDA (USA JWT)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
