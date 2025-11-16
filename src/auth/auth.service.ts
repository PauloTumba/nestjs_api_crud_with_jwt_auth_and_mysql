import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    const { password, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user.id 
    };

    return {
      username: user.username,
      profile: user.profile,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY, // usa o secret do .env
        expiresIn: '1d',                // token expira em 1 dia (pode mudar)
      }),
    };
  }
}
