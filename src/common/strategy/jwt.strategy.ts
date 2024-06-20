import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminRepository } from 'src/admin/admin.repository';
import { JwtBearerToken } from '../@types/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly adminRepository: AdminRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('jwt.bearerSecret'),
    });
  }

  async validate(payload: JwtBearerToken) {
    const adminId = payload.sub;
    return this.adminRepository.transformOne(
      await this.adminRepository.findOne({
        where: { id: adminId },
      }),
    );
  }
}
