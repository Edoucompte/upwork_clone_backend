import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
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

  @IsNotEmpty({
    message: 'La date de debut est recquise',
  })
  @IsDateString({}, { message: 'Foramt de date de debut incorrecte' })
  date_debut: Date;

  @IsDateString({}, { message: 'Foramt de date de fin incorrecte' })
  date_fin: Date;

  @IsNotEmpty({
    message: 'Un nom de diplome est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le diplôme' })
  @IsString({ message: 'Nom de diplôme en lettres' })
  nom_diplome: string;

  @IsNotEmpty({
    message: 'Une filière est recquise',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour la filière' })
  @IsString({ message: 'Nom de filière en lettres' })
  filiere: string;

  @IsNotEmpty({ message: 'Un nom de diplome est recquis' })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le diplôme' })
  @IsString({ message: 'Nom de diplôme en lettres' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'compte associe non fourni' })
  compte_id: number;
}
import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateFormationDto {
  @IsNotEmpty()
  @IsString()
  ecole: string;

  @IsNotEmpty()
  @IsDateString()
  date_debut: string;

  @IsNotEmpty()
  @IsDateString()
  date_fin: string;

  @IsNotEmpty()
  @IsString()
  nom_diplome: string;

  @IsNotEmpty()
  @IsString()
  filiere: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  compte_id: number;
}
