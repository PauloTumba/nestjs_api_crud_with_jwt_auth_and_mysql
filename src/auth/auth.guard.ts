import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  // Injeta o JwtService automaticamente sem precisar usar o constructor
  @Inject()
  private readonly jwtService: JwtService;

  // Método principal executado antes de cada rota protegida
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtém o objeto da requisição HTTP
    const request = context.switchToHttp().getRequest();

    // Extrai apenas o token da autorização ('Bearer token')
    const authorization = this.extractTokenFromHeader(request);

    // Se não houver token, lança erro 401
    if (!authorization) throw new UnauthorizedException('Token is required');

    console.log('Headers:', authorization); // DEBUG → mostra apenas o token

    try {
      // Valida o token JWT usando o SECRET_KEY do .env
      const payload = this.jwtService.verify(authorization, {
        secret: process.env.SECRET_KEY,
      });

      // Armazena os dados do payload do token dentro da request
      // para que o controller possa acessar
      request['sub'] = payload;
    } catch (error) {
      // Se o token estiver errado, expirado ou inválido, lança 401
      throw new UnauthorizedException('Invalid token');
    }

    return true; // Libera o acesso à rota
  }

  // Função que extrai o token do header Authorization
  private extractTokenFromHeader(request: Request): string | undefined {
    // Exibe a SECRET_KEY no console para debug
    console.log('SECRET_KEY:', process.env.SECRET_KEY);

    // request.headers.authorization normalmente é assim: "Bearer TOKEN_AQUI"
    const [type, token] = request.headers['authorization']?.split(' ') || [];

    // Retorna somente o token se o prefixo for 'Bearer'
    return type === 'Bearer' ? token : undefined;
  }
}
