import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Users } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Users[]> {
    return await this.prisma.users.findMany();
  }

  async findBykey(id: number): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur ${email} non trouvé`);
    }

    return user;
  }

  async findUserByResetToken({ token }: { token: string }) {
    const user = await this.prisma.users.findUnique({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur non trouvé`);
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.users.create({
      data: {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        password: hashedPassword,
        pays: data.pays,
      },
    });
  }

  async update(
    id: number,
    data: {
      prenom: string;
      nom: string;
      email: string;
      //password: string; //pas le mot de passe directement
      pays: string;
    },
  ): Promise<Users> {
    const existing = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }
    const { prenom, nom, email, pays } = data;

    // verifiez si parametre non vide et valide
    const updatedData = {};
    if (prenom && prenom.length > 2) {
      updatedData['prenom'] = prenom;
    }

    if (nom && nom.length > 2) {
      updatedData['nom'] = nom;
    }

    if (email && email.length > 6 && email.includes('@')) {
      updatedData['email'] = email;
    }

    if (pays && pays.length > 2) {
      updatedData['pays'] = pays;
    }

    return this.prisma.users.update({
      where: { id },
      data: updatedData,
    });
  }

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`);
    }

    await this.prisma.users.delete({
      where: { id },
    });

    return;
  }
}
