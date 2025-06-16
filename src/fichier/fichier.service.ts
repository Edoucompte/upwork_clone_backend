import { Injectable, NotFoundException } from '@nestjs/common';
import { Fichier, Formation } from 'generated/prisma';
import { CertificationService } from 'src/certification/certification.service';
import { CreateFichierDto } from 'src/dto/fichier/create-fichier.dto';
import { UpdateFichierDto } from 'src/dto/fichier/update-fichier.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichierService {
  constructor(
    private prisma: PrismaService,
    private readonly certificationService: CertificationService,
  ) {}

  // Recherche de tous les fichiers
  async findAll(): Promise<Fichier[]> {
    const fichiers = await this.prisma.fichier.findMany();
    return fichiers;
  }

  // Recherche d'un fichier par son ID
  async findBykey(id: number): Promise<Fichier | null> {
    const fichier = await this.prisma.fichier.findUnique({
      where: { id },
    });

    return fichier;
  }

  // Création de fichiers
  async create(data: CreateFichierDto): Promise<Fichier> {
    // Vérification si la fichiers existe déjà

    return this.prisma.fichier.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateFichierDto): Promise<Formation> {
    const existing = await this.prisma.fichier.findUnique({
      where: { id },
    });
    // Vérification si le fichier existe
    if (!existing) {
      throw new NotFoundException(`fichier avec l'id ${id} non trouvé`);
    }

    const { libelle, path, extension, poids, certification_id } = data;

    // verifiez si parametre non vide et valide

    const updatedData = {};

    if (certification_id && certification_id > 0) {
      // verifier si certification existe
      const certifTrouve =
        await this.certificationService.findBykey(certification_id);
      if (!certifTrouve) {
        throw new NotFoundException('certification fournie inexistante');
      }
      updatedData['certification_id'] = certification_id;
    }
    if (libelle && libelle.length > 2) {
      updatedData['libelle'] = libelle;
    }
    if (path && path.length > 2) {
      updatedData['path'] = path;
    }
    if (extension && extension.length > 2) {
      updatedData['extenstion'] = extension;
    }
    if (poids && poids.length > 2) {
      updatedData['poids'] = poids;
    }

    return this.prisma.formation.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'une fichier

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.fichier.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Fichier avec l'id ${id} non trouvé`);
    }

    await this.prisma.fichier.delete({
      where: { id },
    });

    return;
  }
}
