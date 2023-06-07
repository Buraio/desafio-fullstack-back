import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async clientAuth(@Body() credentials: CredentialsDto) {
    const userData = await this.authService.clientAuth(credentials);

    const payload = {
      sub: userData.id,
      email: userData.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
