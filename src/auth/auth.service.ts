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
import { CompteService } from 'src/compte/compte.service';

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

  async login(data: LoginUserDto) {
    const { password, email } = data;

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
     await this.userService.findBykey(user.id);
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
   console.log(newUserBody);
    const { email, password, prenom,role } = newUserBody;

    const foundUser = await this.userService.findUserByEmail(email);

    if (foundUser) {
      throw new Error(` Un utilisateur utilise deja le mail ${email}`);
    }

    newUserBody.password = await this.hashPassword({ password });

    await this.mailerService.createAccountEmail({
      prenom,
      recipient: email,
    });

    /* 
      Possibilite de l'authentifier direct 
      const createdUser = await this.usersService.createUser(newUserBody);
      return this.authenticate({ userId: createdUser.id });

    */
    const newUser = await this.userService.create(newUserBody);
    console.log(role);
      // Création automatique du compte selon le rôle
  const compteDto = {
    role: role,
    titre_compte: `Compte ${role}`, // ou personnaliser selon ton besoin
    taux_horaire: role === 'freelancer' ? 5000 : 0, // Exemple
     //profil_id: 1, Tu peux lier à un profil par défaut ou dynamique
    user_id: newUser.id,
  };

    const createdCompte =  await this.compteService.create(compteDto);
    return {
  ...newUser,
  compte_id: createdCompte.id,
};
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
