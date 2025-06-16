import { Injectable, NotFoundException } from '@nestjs/common';
import { Compte } from 'generated/prisma';
import { CreateCompteDto } from 'src/dto/compte/create-compte.dto';
import { UpdateCompteDto } from 'src/dto/compte/update-compte.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompteService {


    constructor(private prisma: PrismaService) {}
    
        // Recherche de tous les comptes
      async findAll(): Promise<Compte[]> {
         const allcomptes = await this.prisma.compte.findMany(
        {
         include: {
            langues: true, // récupère toutes les langues associées
            formations: true, // récupère toutes les formations associées
            competences: true, // récupère toutes les compétences associées
            portfolios: true, // récupère tous les portfolios associés
            
          }, 
        }
          
         );
        return allcomptes;
      }
        // Recherche d'un compte par son ID
    
      async findBykey(id: number): Promise<Compte | null> {
        const compte = await this.prisma.compte.findUnique({
          where: { id }
          ,
          include: {
            langues: true, // récupère toutes les langues associées
            formations: true, // récupère toutes les formations associées
            competences: true, // récupère toutes les compétences associées
            portfolios: true, // récupère tous les portfolios associés
          },
        });

        return compte;
      }
    
      async findByRole(role: string):Promise<Compte[]>  {
        const comptes = await this.prisma.compte.findMany({
          where: { role: role },
        });
        if (!comptes || comptes.length === 0) {
          throw new NotFoundException(`Aucun compte trouvé avec le rôle ${role}`);
        }
        return comptes;
      }
    
     
      async create(data: CreateCompteDto): Promise<Compte> {
        // Vérification si le compte existe déjà
        const existingCompte = await this.prisma.compte.findUnique({
          where: { user_id: data.user_id },
        });
        if (existingCompte) {
          throw new Error(`Compte pour l'utilisateur avec l'ID ${data.user_id} existe déjà`);
        }
        // Création du compte

        return this.prisma.compte.create({
          data: data,
        });
      }
    
      async update(id: number, data: UpdateCompteDto): Promise<Compte> {
        const existing = await this.prisma.compte.findUnique({
          where: { id },
        });
    
        if (!existing) {
          throw new NotFoundException(`le Compte avec l'id ${id} non trouvé`);
        }
        const { role, titre_compte, taux_horaire, profil_id} = data;
        console.log(data);
    

        // verifiez si parametre non vide et valide

        const updatedData = {};
        if (role && role.length > 2) {
          updatedData['role'] = role;
        }
    
        if (titre_compte && titre_compte.length > 2) {
          updatedData['titre_compte'] = titre_compte;
        }
    
        if (taux_horaire && taux_horaire.length > 6 ) {
          updatedData['taux_horaire'] = taux_horaire;
        }
        if (profil_id && profil_id > 0) {
          updatedData['profil_id'] = profil_id;
        }
        return this.prisma.compte.update({
          where: { id },
          data: updatedData,
        });
      }
    
      // Suppression d'un utilisateur
    
      async delete(id: number): Promise<any> {
        const existing = await this.prisma.compte.findUnique({
          where: { id },
        });
    
        if (!existing) {
          throw new NotFoundException(`Compte avec l'id ${id} non trouvé`);
        }
    
        await this.prisma.compte.delete({
          where: { id },
        });
    
        return;
      }
}
