import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFormationDto {
  @IsNotEmpty({
    message: 'Une école est recquise pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour école' })
  @IsString({ message: "Nom d'école en lettres" })
  @ApiProperty()
  ecole: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'La date de debut est recquise',
  })
  @IsDateString({}, { message: 'Foramt de date de debut incorrecte' })
  date_debut: Date;

  @ApiProperty()
  @IsDateString({}, { message: 'Foramt de date de fin incorrecte' })
  date_fin: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Un nom de diplome est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le diplôme' })
  @IsString({ message: 'Nom de diplôme en lettres' })
  nom_diplome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Une filière est recquise',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour la filière' })
  @IsString({ message: 'Nom de filière en lettres' })
  filiere: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Un nom de diplome est recquis' })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le diplôme' })
  @IsString({ message: 'Nom de diplôme en lettres' })
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: 'compte associe non fourni' })
  compte_id: number;
}
