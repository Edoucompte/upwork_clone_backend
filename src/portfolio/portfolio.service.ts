import { Injectable, NotFoundException } from '@nestjs/common';
import { Portfolio } from 'generated/prisma';
import { CompteService } from 'src/compte/compte.service';
import { CreatePortfolioDto } from 'src/dto/portfolio/create-portfolio.dto';
import { UpdatePortfolioDto } from 'src/dto/portfolio/update-portfolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(
    private prisma: PrismaService,
    private readonly compteService: CompteService,
  ) {}

  // Recherche de tous les portfolios
  async findAll(): Promise<Portfolio[]> {
    const portfolios = await this.prisma.portfolio.findMany();
    return portfolios;
  }
  // Recherche d'un portefolio par son ID

  async findBykey(id: number): Promise<Portfolio | null> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    return portfolio;
  }

  // Création de portfolio

  async create(data: CreatePortfolioDto): Promise<Portfolio> {
    // Vérification si la portfolio existe déjà

    // verifier si le compte associe existe
    const compteTrouve = await this.compteService.findBykey(data.compte_id);
    if (!compteTrouve) {
      throw new NotFoundException('Compte fourni inexistant');
    }

    return this.prisma.portfolio.create({
      data: data,
    });
  }

  async update(id: number, data: UpdatePortfolioDto): Promise<Portfolio> {
    const existing = await this.prisma.portfolio.findUnique({
      where: { id },
    });
    // Vérification si le portfolio existe
    if (!existing) {
      throw new NotFoundException(`Portfoliosngue avec l'id ${id} non trouvé`);
    }

    const { titre, role, description, compte_id } = data;

    // verifiez si parametre non vide et valide

    const updatedData = {};
    if (titre && titre.length > 2) {
      updatedData['titre'] = titre;
    }
    if (description && description.length > 2) {
      updatedData['description'] = description;
    }
    if (role && role.length > 2) {
      updatedData['role'] = role;
    }
    if (compte_id && compte_id > 0) {
      // verifier si compte existe
      const compteTrouve = await this.compteService.findBykey(compte_id);
      if (!compteTrouve) {
        throw new NotFoundException('Compte fourni inexistant');
      }
      updatedData['compte_id'] = compte_id;
    }

    return this.prisma.portfolio.update({
      where: { id },
      data: updatedData,
    });
  }

  // Suppression d'un portfolio

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Portfolio avec l'id ${id} non trouvé`);
    }

    await this.prisma.portfolio.delete({
      where: { id },
    });

    return;
  }
}
