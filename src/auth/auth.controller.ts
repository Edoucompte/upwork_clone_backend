import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { CreateUserDto } from 'src/dto/user/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  async login(@Body() data: LoginUserDto): Promise<any> {
    return await this.authService.login(data);
  }

  @Post('register')
  @ApiOperation({ summary: 'Inscription utilisateur' })
  async register(@Body() data: CreateUserDto): Promise<any> {
    return await this.authService.register(data);
  }
}
