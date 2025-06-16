import { Injectable, NotFoundException } from '@nestjs/common';
import { Langue } from 'generated/prisma';
import { CompteService } from 'src/compte/compte.service';
import { CreateLangueDto } from 'src/dto/langue/create-langue.dto';
import { UpdateLangueDto } from 'src/dto/langue/update-langue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LangueService {
  constructor(
    private prisma: PrismaService,
    private readonly compteService: CompteService,
  ) {}

  // Recherche de tous les Langues
  async findAll(): Promise<Langue[]> {
    const allLangue = await this.prisma.langue.findMany();
    return allLangue;
  }
  // Recherche d'un Langues par son ID

  async findBykey(id: number): Promise<Langue | null> {
    const langue = await this.prisma.langue.findUnique({
      where: { id },
    });

    return langue;
  }

  // Création de langue

  async create(data: CreateLangueDto): Promise<Langue> {
    // Vérification si la langue existe déjà

    // verifier si le compte associe existe
    const compteTrouve = await this.compteService.findBykey(data.compte_id);
    if (!compteTrouve) {
      throw new NotFoundException('Compte fourni inexistant');
    }

    return this.prisma.langue.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateLangueDto): Promise<Langue> {
    const existing = await this.prisma.langue.findUnique({
      where: { id },
    });
    // Vérification si la langue existe
    if (!existing) {
      throw new NotFoundException(`langue avec l'id ${id} non trouvé`);
    }

    const { nom, niveau, compte_id } = data;

    // verifiez si parametre non vide et valide

    const updatedData = {};
    if (nom && nom.length > 2) {
      updatedData['nom'] = nom;
    }
    if (niveau && niveau.length > 2) {
      updatedData['niveau'] = niveau;
    }
    if (compte_id && compte_id > 0) {
      // verifier si compte existe
      const compteTrouve = await this.compteService.findBykey(compte_id);
      if (!compteTrouve) {
        throw new NotFoundException('Compte fourni inexistant');
      }
      updatedData['compte_id'] = compte_id;
    }

    return this.prisma.langue.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'une langue

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.langue.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Langue avec l'id ${id} non trouvé`);
    }

    await this.prisma.langue.delete({
      where: { id },
    });

    return;
  }
}
