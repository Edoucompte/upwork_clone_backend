import { Adresse, Compte } from 'generated/prisma';

export class OutputUser {
  id: number;

  prenom: string;
  nom: string;
  email: string;
  pays: string;
  compte: Compte[];
  adresse: Adresse | null;
  createdAt: Date;
}
