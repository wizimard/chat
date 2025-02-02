import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { JwtAccessStrategy, JwtRefreshStrategy } from '../jwt/jwt.strategy';
import { JwtTokenService } from '../jwt/jwt.service';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenService,
    JwtAccessStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthModule {}
