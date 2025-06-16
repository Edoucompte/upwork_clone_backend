import { Injectable, NotFoundException } from '@nestjs/common';
import { Formation } from 'generated/prisma';
import { CreateFormationDto } from 'src/dto/formation/create-formation.dto';
import { UpdateFormationDto } from 'src/dto/formation/update-formation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FormationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Formation[]> {
    return await this.prisma.formation.findMany();
  }

  async findByKey(id: number): Promise<Formation | null> {
    return await this.prisma.formation.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateFormationDto): Promise<Formation> {
    //const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.formation.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateFormationDto): Promise<Formation> {
    const existing = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Formation avec l'id ${id} non trouvé`);
    }
    const {
      ecole,
      nom_diplome,
      date_debut,
      date_fin,
      filiere,
      description,
      compte_id,
    } = data;

    // verifiez si parametre non vide et valide
    const updatedData = {};
    if (ecole && ecole.length > 2) {
      updatedData['ecole'] = ecole;
    }

    if (nom_diplome && nom_diplome.length > 2) {
      updatedData['nom_diplome'] = nom_diplome;
    }

    if (date_debut && Date.now() - date_debut.getTime() > 0) {
      updatedData['date_debut'] = date_debut;
    }

    if (date_fin && Date.now() - date_fin.getTime() > 0) {
      updatedData['date_fin'] = date_fin;
    }

    if (filiere && filiere.length > 2) {
      updatedData['filiere'] = filiere;
    }

    if (description && description.length > 2) {
      updatedData['description'] = description;
    }

    // chercher le compte ici pour verifier
    //const compte = await
    if (compte_id && true) {
      updatedData['compte_id'] = compte_id;
    }

    return this.prisma.formation.update({
      where: { id },
      data: updatedData,
    });
  }

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.formation.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Formation avec l'id ${id} non trouvée`);
    }

    await this.prisma.formation.delete({
      where: { id },
    });

    return;
  }
}
