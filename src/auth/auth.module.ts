import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { AdminAuthController } from './admin-auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    AdminModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('jwt.bearerSecret'),
        signOptions: {
          expiresIn: configService.getOrThrow('jwt.bearerValiditySec'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AdminAuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
