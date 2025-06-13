import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/user/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './jwt.strategy';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    //private readonly prisma: PrismaService,
    private readonly userService: UserService,
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
