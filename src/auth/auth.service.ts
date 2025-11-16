// Importa decorators e utilidades do NestJS
import { Injectable } from '@nestjs/common';

// Biblioteca para comparar e encriptar senhas
import * as bcrypt from 'bcrypt';

// Serviço que lida com os usuários (buscar no DB, etc.)
import { UsersService } from '../users/users.service';

// Serviço responsável por gerar e validar tokens JWT
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // Injeta UsersService e JwtService no construtor para poder usá-los
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida o usuário verificando:
   * 1. Se o username existe
   * 2. Se a senha enviada corresponde à senha encriptada no banco
   */
  async validateUser(username: string, pass: string): Promise<any> {
    // Busca o usuário pelo username
    const user = await this.usersService.findOne(username);

    // Se não existir, retorna null
    if (!user) return null;

    // Compara a senha enviada com o hash salvo no banco
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    // Remove a senha antes de retornar os dados do usuário
    const { password, ...rest } = user;
    return rest;
  }

  /**
   * Gera o token JWT para o usuário autenticado
   */
  async login(user: any) {
    // Payload = dados que estarão dentro do token
    const payload = { 
      username: user.username,   // Nome do usuário
      sub: user.id               // ID que representa o "subject"
    };

    // Retorna as informações para o cliente
    return {
      username: user.username,
      profile: user.profile,

      // Gera o token JWT usando o SECRET_KEY do .env
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY, // chave privada do token
        expiresIn: '1d',                // define validade de 1 dia
      }),
    };
  }
}
