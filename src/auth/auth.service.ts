import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './jwt.strategy';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/user/mailer.service';
import { createId } from '@paralleldrive/cuid2';
import { ResetUserPasswordDto } from 'src/dto/user/reset-password.dto';
import { CompteService } from 'src/compte/compte.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly compteService: CompteService,
    // Assuming compteService is defined elsewhere
  ) {}

  async login(data: LoginUserDto, res: Response) {
    const { password, email } = data;

    // verify user credentials
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email incorrect');
    }

    const isPasswordValide = await this.isPasswordValid({
      password,
      hashedPassword: user.password,
    });
    console.log(password, user.password, isPasswordValide);
    if (!isPasswordValide) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    //await this.userService.findBykey(user.id);
    //const payload: UserPayload = { sub: user.id, email: user.email };

    // geneerate tokens
    const { accessToken, refreshToken } = this.createTokens({
      sub: user.id,
      email: user.email,
    });

    // store tokens
    await this.userService.updateTokens(user.id, accessToken, refreshToken);

    // set tokens in the cookies
    this.setTokensInCookies(res, accessToken, refreshToken);

    return {
      id: user.id,
      prenom: user.prenom,
      email: user.email,
      pays: user.pays,
    };
  }

  async register(newUserBody: CreateUserDto, res: Response) {
    //console.log(newUserBody);
    const { email, password, prenom, role } = newUserBody;

    const foundUser = await this.userService.findUserByEmail(email);

    if (foundUser) {
      throw new Error(` Un utilisateur utilise deja le mail ${email}`);
    }

    newUserBody.password = await this.hashPassword({ password });

    /*await this.mailerService.createAccountEmail({
      prenom,
      recipient: email,
    });*/

    /* 
      Possibilite de l'authentifier direct 
      const createdUser = await this.usersService.createUser(newUserBody);
      return this.authenticate({ userId: createdUser.id });

    */
    const newUser = await this.userService.create(newUserBody);
    //console.log(role);
    // Création automatique du compte selon le rôle
    const compteDto = {
      role: role,
      titre_compte: `Compte ${role}`, // ou personnaliser selon ton besoin
      taux_horaire: role === 'freelancer' ? 5000 : 0, // Exemple
      //profil_id: 1, Tu peux lier à un profil par défaut ou dynamique
      user_id: newUser.id,
    };

    const createdCompte = await this.compteService.create(compteDto);

    // generer les tokens
    const { accessToken, refreshToken } = this.createTokens({
      sub: newUser.id,
      email: newUser.email,
    });

    // stocker tokens
    await this.userService.updateTokens(newUser.id, accessToken, refreshToken);

    // set tokens in the cookies
    this.setTokensInCookies(res, accessToken, refreshToken);

    return {
      //...newUser,
      id: newUser.id,
      email: newUser.email,
      prenom: newUser.prenom,
      nom: newUser.nom,
      role: newUser.role,
      pays: newUser.pays,
      createdAt: newUser.createdAt,
      compte_id: createdCompte.id,
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const oldRefreshToken = req.cookies['refresh_token'];

    if (!oldRefreshToken) {
      throw new UnauthorizedException('Pas de token trouve');
    }

    // ils verifier, cree et met a jour
    const { accessToken, refreshToken } =
      await this.createRefreshToken(oldRefreshToken);

    // set nouveau tokens dans les cookies
    this.setTokensInCookies(res, accessToken, refreshToken);
  }

  async resetUserPasswordRequest({ email }: { email: string }) {
    const foundUser = await this.userService.findUserByEmail(email);

    if (!foundUser) {
      throw new Error(`Utilisateur ${email} inexistant`);
    }

    if (foundUser.isResettingPassword) {
      throw new Error(
        'Une demande de reinitialisation de mot de passe est deja en cours',
      );
    }

    const createdId = createId();
    await this.prisma.users.update({
      where: {
        id: foundUser.id,
      },
      data: {
        isResettingPassword: true,
        resetPasswordToken: createdId,
      },
    });

    await this.mailerService.sendResquestedPassword({
      prenom: foundUser.prenom,
      recipient: foundUser.email,
      token: createdId,
    });

    return true;
  }

  async verifyResetPasswordToken({ token }: { token: string }) {
    const foundUser = await this.userService.findUserByResetToken({ token });

    if (!foundUser) {
      throw new Error('Utilisateur inexistant');
    }

    if (!foundUser.isResettingPassword) {
      throw new Error(
        "Aucune demande de reinitialisation de mot de passe n'est en cours",
      );
    }

    return 'Token correcte';
  }

  async resetUserPassword({
    resetUserPassowrdDto,
  }: {
    resetUserPassowrdDto: ResetUserPasswordDto;
  }) {
    const { password, token } = resetUserPassowrdDto;
    const foundUser = await this.userService.findUserByResetToken({ token });

    if (!foundUser) {
      throw new Error('Utilisateur inexistant');
    }

    if (!foundUser.isResettingPassword) {
      throw new Error(
        "Aucune demande de reinitialisation de mot de passe n'est en cours",
      );
    }

    await this.prisma.users.update({
      where: {
        id: foundUser.id,
      },
      data: {
        isResettingPassword: false,
        password: await this.hashPassword({ password }), // crypter le pass, tjrs!
      },
    });

    return 'Veuillez consulter vos emails pour reinnitialiser votre mot de passe ';
  }

  private createTokens(payload: UserPayload) {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '2d',
      }),
    };
  }

  private async hashPassword({ password }: { password: string }) {
    return await bcrypt.hash(password, 10);
  }

  private async isPasswordValid({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Method to set tokens in HTTP-only cookies
  setTokensInCookies(res: Response, accessToken: string, refreshToken: string) {
    const accessTokenExpires = new Date(
      Date.now() + 1 * 60 * 60 * 1000,
      //this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME_MS'), // Convert to milliseconds
    );
    const refreshTokenExpires = new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000,
      //this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME_MS'), // Convert to milliseconds
    );

    // Set Access Token Cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true, // Cannot be accessed by client-side JavaScript
      secure: false, //this.configService.get<string>('NODE_ENV') === 'production', // Send only over HTTPS in production
      expires: accessTokenExpires, // Set expiration date
      sameSite: 'lax', // Protects against some CSRF attacks (flexible for development)
      path: '/', // Accessible across the entire domain
    });

    // Set Refresh Token Cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, //this.configService.get<string>('NODE_ENV') === 'production',
      expires: refreshTokenExpires,
      sameSite: 'lax',
      path: '/auth/ref', // Or a more specific path if your refresh endpoint is isolated
      // You might set a different path for the refresh token to limit its scope
    });
  }

  // (Optional) Method to clear cookies on logout
  clearTokensFromCookies(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false, //this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false, //this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/auth/ref',
    });
  }

  // Method to validate refresh token and generate new tokens
  async createRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<UserPayload>(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // verifier si token correspond avec token de user avec cet id
      const isValid = await this.userService.verifyRefreshToken(
        payload.sub,
        refreshToken,
      );
      if (!isValid) {
        throw new UnauthorizedException('Refresh token invalide');
      }

      //const { sub: userId, email } = payload;
      return this.createTokens(payload); // Generate new access and refresh tokens
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
