import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Experience } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompteService } from 'src/compte/compte.service';
import { CreateExperienceDto } from 'src/dto/experience/create-experience.dto';
import { UpdateExperienceDto } from 'src/dto/experience/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly compteService: CompteService,
  ) {}

  // 🔍 Trouver toutes les expériences d’un compte
  async findAllByCompte(compte_id: number): Promise<Experience[]> {
    return this.prisma.experience.findMany({
      where: { compte_id },
      orderBy: { dateDebut: 'desc' },
    });
  }

  // 🔍 Trouver une expérience par ID
  async findOne(id: number): Promise<Experience> {
    const exp = await this.prisma.experience.findUnique({ where: { id } });
    if (!exp) {
      throw new NotFoundException(`Expérience avec l'ID ${id} introuvable`);
    }
    return exp;
  }

  // ➕ Créer une expérience
  async create(data: CreateExperienceDto): Promise<Experience> {
    // Vérifier que le compte existe
    const compte = await this.compteService.findBykey(data.compte_id);
    if (!compte) {
      throw new NotFoundException('Le compte associé est introuvable');
    }

    return this.prisma.experience.create({
      data,
    });
  }

  // ✏️ Mettre à jour une expérience
  async update(
    id: number,
    data: UpdateExperienceDto,
  ): Promise<Experience> {
    const existing = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Expérience avec l'ID ${id} introuvable`);
    }

    return this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  // ❌ Supprimer une expérience
  async remove(id: number): Promise<void> {
    const existing = await this.prisma.experience.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Expérience avec l'ID ${id} introuvable`);
    }

    await this.prisma.experience.delete({
      where: { id },
    });
  }
}
