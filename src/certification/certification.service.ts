import { Injectable, NotFoundException } from '@nestjs/common';
import { Certification } from 'generated/prisma';
import { CompteService } from 'src/compte/compte.service';
import { CreateCertificationDto } from 'src/dto/certification/create-certification.dto';
import { UpdateCertificationDto } from 'src/dto/certification/update-certification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CertificationService {
  constructor(
    private prisma: PrismaService,
    private readonly compteService: CompteService,
  ) {}

  // Recherche de toutes les certifications
  async findAll(): Promise<Certification[]> {
    const certifications = await this.prisma.certification.findMany();
    return certifications;
  }

  // Recherche d'une certification par son ID
  async findBykey(id: number): Promise<Certification | null> {
    const certification = await this.prisma.certification.findUnique({
      where: { id },
    });

    return certification;
  }

  // Création de certifications
  async create(data: CreateCertificationDto): Promise<Certification> {
    // Vérification si la certification existe déjà

    // verifier si le compte associe existe
    const compteTrouve = await this.compteService.findBykey(data.compte_id);
    if (!compteTrouve) {
      throw new NotFoundException('Compte fourni inexistant');
    }

    return this.prisma.certification.create({
      data: data,
    });
  }

  async update(
    id: number,
    data: UpdateCertificationDto,
  ): Promise<Certification> {
    const existing = await this.prisma.certification.findUnique({
      where: { id },
    });
    // Vérification si le certifications existe
    if (!existing) {
      throw new NotFoundException(`Certification avec l'id ${id} non trouvée`);
    }

    const { libelle, type, date_obtention, compte_id } = data;

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
    if (libelle && libelle.length > 2) {
      updatedData['libelle'] = libelle;
    }
    if (type && type.length > 2) {
      updatedData['type'] = type;
    }
    if (date_obtention && Date.now() - date_obtention.getTime() > 0) {
      updatedData['date_obtention'] = date_obtention;
    }

    return this.prisma.certification.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'une certification

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.certification.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Certification avec l'id ${id} non trouvée`);
    }

    await this.prisma.certification.delete({
      where: { id },
    });

    return;
  }
}
