import { Injectable, NotFoundException } from '@nestjs/common';
import { Formation } from 'generated/prisma';
import { CompteService } from 'src/compte/compte.service';
import { CreateFormationDto } from 'src/dto/formation/create-formation.dto';
import { UpdateFormationDto } from 'src/dto/formation/update-formation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormationService {
  constructor(
    private prisma: PrismaService,
    private readonly compteService: CompteService,
  ) {}

  // Recherche de tous les formation
  async findAll(): Promise<Formation[]> {
    const allformations = await this.prisma.formation.findMany();
    return allformations;
  }
  // Recherche d'un formation par son ID

  async findBykey(id: number): Promise<Formation | null> {
    const formation = await this.prisma.formation.findUnique({
      where: { id },
    });

    return formation;
  }

  // Création de formation

  async create(data: CreateFormationDto): Promise<Formation> {
    // Vérification si la formation existe déjà

    return this.prisma.formation.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateFormationDto): Promise<Formation> {
    const existing = await this.prisma.formation.findUnique({
      where: { id },
    });
    // Vérification si la formation existe
    if (!existing) {
      throw new NotFoundException(`formation avec l'id ${id} non trouvé`);
    }

    const {
      ecole,
      date_debut,
      date_fin,
      nom_diplome,
      filiere,
      description,
      compte_id,
    } = data;

    // verifiez si parametre non vide et valide

    const updatedData = {};

    if (compte_id && compte_id > 0) {
      // verifier si compte existe
      const compteTrouve = await this.compteService.findBykey(compte_id);
      if (!compteTrouve) {
        throw new NotFoundException('Compte fourni inexistant');
      }
      updatedData['compte_id'] = compte_id;
    }
    if (ecole && ecole.length > 2) {
      updatedData['ecole'] = ecole;
    }
    if (date_debut && Date.now() - date_debut.getTime() > 0) {
      updatedData['date_debut'] = date_debut;
    }
    if (date_fin && Date.now() - date_fin.getTime() > 2) {
      updatedData['date_fin'] = date_fin;
    }
    if (nom_diplome && nom_diplome.length > 2) {
      updatedData['nom_diplome'] = nom_diplome;
    }
    if (filiere && filiere.length > 2) {
      updatedData['filiere'] = filiere;
    }
    if (description && description.length > 2) {
      updatedData['description'] = description;
    }

    return this.prisma.formation.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'une formation

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.formation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`formation avec l'id ${id} non trouvé`);
    }

    await this.prisma.formation.delete({
      where: { id },
    });

    return;
  }
}
