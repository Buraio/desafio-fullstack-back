import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async clientAuth(data) {
    const existentUser = await this.prisma.client.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existentUser) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const validatePassword = await bcrypt.compare(
      data.password,
      existentUser.password,
    );

    if (!validatePassword) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    return existentUser;
  }
}
