import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma';
import { CreateUserDto,LoginUserDto } from '../dtoclass'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService ,
    private jwtService: JwtService) {}
  

//Recuperer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }


// Recuperer un utilisateur par son id
  async findBykey(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }

    return user;
  }

  // Creation d'un utilisateur
  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({ data: {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        password: hashedPassword,
        pays: data.pays,
      }, });
  }

  // Mise a jour d'un utilisateur

  async update(id: number, data: CreateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Suppression d'un utilisateur

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Utilisateur supprimé avec succès' };
  }


  // Connexion d'un utilisateur

  async login(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email incorrect');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

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
}

