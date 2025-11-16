import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import {  PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    // PassportModule,
    JwtModule.register({
      secret: 'SECRET_JWT_KEY', // coloque no .env depois
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthGuard],
  exports:[AuthGuard, AuthService, JwtModule],
})
export class AuthModule {}
