import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth') 
// Define o prefixo das rotas deste controller → todas serão /auth/alguma-coisa
export class AuthController {
  constructor(private authService: AuthService) {}
  // Injeta o AuthService para lidar com login e geração do token

  @UseGuards(LocalAuthGuard)
  // Antes de entrar no método login(), o LocalAuthGuard é executado.
  // Ele valida username e password e injeta em req.user caso estejam correctos.
  @Post('login')
  login(@Request() req) {
    // req.user vem automaticamente do LocalAuthGuard após validação
    return this.authService.login(req.user);
    // Retorna o token JWT gerado no AuthService
  }

  @UseGuards(JwtAuthGuard)
  // Rota protegida: só acessa se enviar um token JWT válido no header Authorization
  @Post('profile')
  getProfile(@Request() req) {
    // req.user vem do JwtStrategy (payload decodificado do token)
    return req.user;
  }
}
