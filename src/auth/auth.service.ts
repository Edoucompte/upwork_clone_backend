import { Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async login(data: LoginUserDto) {
    const { password, email } = data;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email incorrect');
    }

    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: user.password,
    });
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    //const payload: UserPayload = { sub: user.id, email: user.email };
    const access_token = this.createAccesToken({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token,
      user: {
        id: user.id,
        prenom: user.prenom,
        email: user.email,
        pays: user.pays,
      },
    };
  }

  async register(newUserBody: CreateUserDto) {
    try {
      const { email, password, prenom } = newUserBody;

      const foundUser = await this.userService.findUserByEmail(email);

      if (foundUser) {
        throw new Error(` Un utilisateur utilise deja le mail ${email}`);
      }

      newUserBody.password = await this.hashPassword({ password });

      /*await this.mailerService.createAccountEmail({
        prenom,
        recipient: email,
      });*/
    } catch (error) {
      console.log(error.message);
      return {
        error: true,
        message: 'Erreur innattendue',
      };
    }

    /* 
      Possibilite de l'authentifier direct 
      const createdUser = await this.usersService.createUser(newUserBody);
      return this.authenticate({ userId: createdUser.id });

    */
    return await this.userService.create(newUserBody);
  }

  async resetUserPasswordRequest({ email }: { email: string }) {
    try {
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

      return {
        error: false,
        message:
          'Veuillez consulter vos emails pour reinnitialiser votre mot de passe ',
      };
    } catch (error) {
      console.log(error.message);
      return {
        error: true,
        message: 'Erreur innattendue',
      };
    }
  }

  async verifyResetPasswordToken({ token }: { token: string }) {
    try {
      const foundUser = await this.userService.findUserByResetToken({ token });

      if (!foundUser) {
        throw new Error('Utilisateur inexistant');
      }

      if (!foundUser.isResettingPassword) {
        throw new Error(
          "Aucune demande de reinitialisation de mot de passe n'est en cours",
        );
      }

      return {
        error: false,
        message: 'Token correcte',
      };
    } catch (error) {
      console.log(error.message);
      return {
        error: true,
        message: 'Erreur innattendue',
      };
    }
  }

  async resetUserPassword({
    resetUserPassowrdDto,
  }: {
    resetUserPassowrdDto: ResetUserPasswordDto;
  }) {
    const { password, token } = resetUserPassowrdDto;
    try {
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

      return {
        error: false,
        message:
          'Veuillez consulter vos emails pour reinnitialiser votre mot de passe ',
      };
    } catch (error) {
      console.log(error.message);
      return {
        error: true,
        message: 'Erreur innattendue',
      };
    }
  }

  private createAccesToken(payload: UserPayload) {
    return {
      acces_token: this.jwtService.sign(payload),
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
}
