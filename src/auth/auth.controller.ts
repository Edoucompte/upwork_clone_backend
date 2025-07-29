import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  //ApiBearerAuth,
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
import { Request, Response } from 'express';

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
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseJson> {
    try {
      const response = await this.authService.login(data, res);
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
  async register(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseJson> {
    try {
      const response = await this.authService.register(data, res);
      return {
        code: 201,
        data: response,
        error: false,
        message: "Identifiant de l'utilisateur inscrit",
      };
    } catch (error) {
      //console.log(error.message);
      return {
        code: 400,
        data: null,
        error: false,
        message: error.message,
      };
    }
  }

  @Post('token/refresh')
  @ApiOperation({ summary: 'rafraichir tokens expire' })
  @ApiResponse({
    status: 200,
    description: "cookies contenant les tokens de l'utilisateur",
  })
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseJson> {
    try {
      const response = await this.authService.refreshTokens(req, res);
      return {
        code: 200,
        data: response,
        error: false,
        message: "cookies contenant les tokens de l'utilisateur",
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 400,
        data: null,
        error: false,
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
        code: 401,
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
        code: 401,
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
  //@ApiBearerAuth()
  @Get('authenticate')
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
        code: 401,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOperation({ summary: "Deconnexion d'utilisateur " })
  @ApiResponse({
    status: 200,
    description: 'utilisateur deconnecte',
  })
  logout(@Res({ passthrough: true }) res: Response): ResponseJson {
    try {
      const response = this.authService.clearTokensFromCookies(res);
      return {
        code: HttpStatus.OK,
        data: response,
        message: 'Utilisateur authentifié',
        error: false,
      };
    } catch (error) {
      console.log(error.message);
      return {
        code: 401,
        data: null,
        error: true,
        message: error.message,
      };
    }
  }
}
