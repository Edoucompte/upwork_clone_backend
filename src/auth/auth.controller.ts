import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ResetUserPasswordDto } from 'src/dto/user/reset-password.dto';
import { RequestWithUser } from './jwt.strategy';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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

  @Post('reset-user-password')
  @ApiOperation({ summary: 'Demande de changement de mot de passe' })
  async resetUserPasswordRequest(@Body() email: string) {
    return await this.authService.resetUserPasswordRequest({ email });
  }

  @Get('verify-reset-token')
  @ApiOperation({
    summary: 'Verification du token de changement de mot de passe',
  })
  async verifyResetPasswordToken(@Query('token') token: string) {
    return await this.authService.verifyResetPasswordToken({ token });
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Changement du mot de passe' })
  async resetUserPassword(@Body() resetUserPassowrdDto: ResetUserPasswordDto) {
    return await this.authService.resetUserPassword({ resetUserPassowrdDto });
  }

  // on veut utiliser JwtStrategy
  // la strategy ici se charge de recuperer le token, et de chercher le user qui 
  // lui correspond automatiquement
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "Authentification d'utilisateur par token" })
  async getAuthenticatedUser(@Req() request: RequestWithUser) {
    return await this.userService.findBykey(request.user.sub);
  }
}
