import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ResetUserPasswordDto } from 'src/dto/user/reset-password.dto';
import { RequestWithUser } from './jwt.strategy';
import { ResponseJson } from 'src/dto/response-json';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({
    status: 200,
    description: "Token et inforrmations de l'utilisateur connecte",
  })
  async login(@Body() data: LoginUserDto): Promise<ResponseJson> {
    try {
      const response = await this.authService.login(data);
      return {
        code: 200,
        data: response,
        error: false,
        message: "Information de l'utilisateur connecte",
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiResponse({
    status: 201,
    description: "Id de l'utilisateur nouvellement enregistre",
  })
  async register(@Body() data: CreateUserDto): Promise<ResponseJson> {
    try {
      const response = await this.authService.register(data);
      return {
        code: 200,
        data: response,
        error: false,
        message: "Identifiant de l'utilisateur inscrit",
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }

  @Post('reset-password-request')
  @ApiOperation({ summary: 'Demande de changement de mot de passe par email' })
  @ApiResponse({
    status: 200,
    description: 'Information de la demande de changement de mot de passe',
  })
  async resetUserPasswordRequest(
    @Body(new ValidationPipe()) email: string,
  ): Promise<ResponseJson> {
    try {
      const response = await this.authService.resetUserPasswordRequest({
        email,
      });
      return {
        code: 200,
        data: response,
        error: false,
        message: 'Information de la demande de changement de mot de passe',
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }

  @Get('verify-reset-token')
  @ApiOperation({
    summary: 'Verification du token de changement de mot de passe',
  })
  @ApiResponse({
    status: 200,
    description: 'Etat de la verification de token changement de mot de passe',
  })
  async verifyResetPasswordToken(
    @Query('token') token: string,
  ): Promise<ResponseJson> {
    try {
      const response = await this.authService.verifyResetPasswordToken({
        token,
      });
      return {
        code: 200,
        data: response,
        message: 'Etat de la verification de token changement de mot de passe',
        error: false,
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Changement du mot de passe' })
  @ApiResponse({
    status: 200,
    description: 'Changement de mot de passe',
  })
  async resetUserPassword(
    @Body() resetUserPassowrdDto: ResetUserPasswordDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.authService.resetUserPassword({
        resetUserPassowrdDto,
      });
      return {
        code: 200,
        data: response,
        message: 'Changement de mot de passe',
        error: false,
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }

  // on veut utiliser JwtStrategy
  // la strategy ici se charge de recuperer le token, et de chercher le user qui
  // lui correspond automatiquement
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: "Authentification d'utilisateur par token" })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur authentifié',
  })
  async getAuthenticatedUser(
    @Req() request: RequestWithUser,
  ): Promise<ResponseJson> {
    try {
      const response = await this.userService.findBykey(request.user.sub);
      return {
        code: 200,
        data: response,
        message: 'Utilisateur authentifié',
        error: false,
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }
}
