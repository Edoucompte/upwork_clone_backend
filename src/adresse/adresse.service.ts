import { Injectable, NotFoundException } from '@nestjs/common';
import { Adresse } from 'generated/prisma';
import { CreateAdresseDto } from 'src/dto/adresse/create-adresse.dto';
import { UpdateAdresseDto } from 'src/dto/adresse/update-adresse.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdresseService {
  constructor(private prisma: PrismaService) {}

  // Recherche de tous les Adresses
  async findAll(): Promise<Adresse[]> {
    const allAdresse = await this.prisma.adresse.findMany();
    return allAdresse;
  }
  // Recherche d'un Adresse par son ID

  async findBykey(id: number): Promise<Adresse | null> {
    const adresse = await this.prisma.adresse.findUnique({
      where: { id },
    });

    return adresse;
  }

  async create(data: CreateAdresseDto): Promise<Adresse> {
    // Vérification si le compte existe déjà
    const existingAdresse = await this.prisma.adresse.findUnique({
      where: { user_id: data.user_id },
    });
    if (existingAdresse) {
      throw new Error(
        `adresse pour l'utilisateur avec l'ID ${data.user_id} existe déjà`,
      );
    }
    // Création du compte

    return this.prisma.adresse.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateAdresseDto): Promise<Adresse> {
    const existing = await this.prisma.compte.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`l'adresse avec l'id ${id} non trouvé`);
    }

    const { pays, ville, code_postal, quartier, user_id } = data;

    // verifiez si parametre non vide et valide

    const updatedData = {};
    if (pays && pays.length > 2) {
      updatedData['pays'] = pays;
    }
    if (ville && ville.length > 2) {
      updatedData['ville'] = ville;
    }

    if (code_postal && code_postal.length > 2) {
      updatedData['code_postal'] = code_postal;
    }
    if (quartier && quartier.length > 2) {
      updatedData['adresse'] = quartier;
    }
    if (user_id && user_id > 0) {
      updatedData['user_id'] = user_id;
    }

    return this.prisma.adresse.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'un utilisateur

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.adresse.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Adresse avec l'id ${id} non trouvé`);
    }

    await this.prisma.adresse.delete({
      where: { id },
    });

    return;
  }
}
