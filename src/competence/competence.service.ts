import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Competence } from 'generated/prisma';
import { CompteService } from 'src/compte/compte.service';
import { CreateCompetenceDto } from 'src/dto/competence/create-competence.dto';
import { UpdateCompetenceDto } from 'src/dto/competence/update-competence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompetenceService {
  constructor(
    private prisma: PrismaService,
    private readonly compteService: CompteService,
  ) {}

  // Recherche de tous les competences
  async findAll(): Promise<Competence[]> {
    const allcompetences = await this.prisma.competence.findMany();
    return allcompetences;
  }
  // Recherche d'un competence par son ID

  async findBykey(id: number): Promise<Competence | null> {
    const competence = await this.prisma.competence.findUnique({
      where: { id },
    });

    return competence;
  }

  // Création de competence

  async create(data: CreateCompetenceDto): Promise<Competence> {
    const { compte_id, portfolio_id } = data;
    // Vérification si la competence existe déjà

    // Si aucun des deux n'est fourni → erreur
    await this.checkCompteAndPortfolio({ compte_id, portfolio_id });
    return this.prisma.competence.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateCompetenceDto): Promise<Competence> {
    const existing = await this.prisma.competence.findUnique({
      where: { id },
    });
    // Vérification si la competence existe
    if (!existing) {
      throw new NotFoundException(`competence avec l'id ${id} non trouvé`);
    }

    const { competence, compte_id, portfolio_id } = data;

    // Si aucun des deux n'est fourni → erreur
    await this.checkCompteAndPortfolio({ compte_id, portfolio_id });

    // verifiez si parametre non vide et valide

    const updatedData = {};
    if (competence && competence.length > 2) {
      updatedData['competence'] = competence;
    }

    return this.prisma.competence.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'une compétence

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.competence.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`competence avec l'id ${id} non trouvé`);
    }

    await this.prisma.competence.delete({
      where: { id },
    });

    return;
  }

  private async checkCompteAndPortfolio({
    compte_id,
    portfolio_id,
  }: {
    compte_id: number | undefined;
    portfolio_id: number | undefined;
  }) {
    if (!compte_id && !portfolio_id) {
      throw new BadRequestException(
        'Vous devez associer la compétence à un compte ou à un portfolio.',
      );
    }

    if (compte_id && portfolio_id) {
      throw new BadRequestException(
        "Vous ne pouvez associer la compétence qu'à un compte ou à un portfolio.",
      );
    }

    if (compte_id) {
      // verifier si le compte associe existe
      const compteTrouve = await this.compteService.findBykey(compte_id);
      if (!compteTrouve) {
        throw new NotFoundException('Compte fourni inexistant');
      }
    } else {
      // portfolio check
    }
  }
}
