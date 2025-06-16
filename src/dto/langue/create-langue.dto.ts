import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateLangueDto {
  @IsNotEmpty({
    message: 'Un nom de langue est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour la langue' })
  @IsString({ message: 'Nom de langue en lettres' })
  nom: string;

  @IsNotEmpty({
    message: 'Un niveau de langue est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour la niveau' })
  @IsString({ message: 'Niveau de langue en lettres' })
  niveau: string;

  @IsNumber()
  @IsNotEmpty({ message: 'compte associe non fourni' })
  compte_id: number;
}
