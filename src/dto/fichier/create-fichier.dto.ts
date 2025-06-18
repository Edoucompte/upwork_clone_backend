import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFichierDto {
  @IsNotEmpty({
    message: 'Un libellé est recquis pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour libellé' })
  @IsString({ message: 'Libellé en lettres' })
  @ApiProperty()
  libelle: string;

  @IsNotEmpty({
    message: 'Un chemin de fichier est recquis pour cette action',
  })
  @MinLength(2, {
    message: 'Entrez au moins 2 caracteres pour chemin de fichier',
  })
  @IsString({ message: 'chemin de fichier en lettres' })
  @ApiProperty()
  path: string;

  @IsNotEmpty({
    message: 'Une extension est recquise pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour extension' })
  @IsString({ message: 'extension en lettres' })
  @ApiProperty()
  extension: string;

  @IsNotEmpty({
    message: 'Un poids est recquise pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le poids' })
  @IsString({ message: 'poids en lettres' })
  @ApiProperty()
  poids: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  certification_id: number;
}
