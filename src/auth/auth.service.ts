import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from 'src/admin/admin.repository';
import { AdminEntity } from 'src/admin/entity/admin.entity';
import { CustomHttpStatusCode } from 'src/common/@types/enums/http-custom-code.enums';
import { JwtBearerToken } from 'src/common/@types/interfaces/jwt-payload.interface';
import { CustomException } from 'src/common/exception/custom-exception';
import { generateHash } from 'src/common/helpers/functions/hashing';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async makeBearerToken(user: AdminEntity) {
    const tokenData: JwtBearerToken = {
      sub: user.id,
    };
    return await this.jwtService.signAsync(tokenData);
  }

  private async insertAdmin(name: string, email: string, password: string) {
    const { hashedValue, salt } = await generateHash(password);

    await this.adminRepository.save(
      this.adminRepository.create({
        name,
        email,
        password: hashedValue,
        salt,
      }),
    );
  }

  async login(dto: LoginDto) {
    const admin = await this.adminRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!admin) {
      throw new CustomException(
        'Incorrect credentials',
        400,
        CustomHttpStatusCode.AdminAuthIncorrectCredential,
      );
    }

    const isPasswordValid = await admin.verifyPassword(dto.password);
    if (!isPasswordValid) {
      throw new CustomException(
        'Incorrect credentials',
        400,
        CustomHttpStatusCode.AdminAuthIncorrectCredential,
      );
    }

    return {
      admin: this.adminRepository.transformOne(admin),
      token: await this.makeBearerToken(admin),
    };
  }
}
