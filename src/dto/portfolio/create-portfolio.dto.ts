import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty({
    message: 'Un titre est recquise pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le titre' })
  @IsString({ message: 'Titre en lettres' })
  @ApiProperty()
  titre: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Role est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le Role' })
  @IsString({ message: 'Role en lettres' })
  role: string;

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
