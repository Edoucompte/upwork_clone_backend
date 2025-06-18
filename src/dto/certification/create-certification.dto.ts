import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCertificationDto {
  @IsNotEmpty({
    message: 'Un libellé est recquis pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour libellé' })
  @IsString({ message: 'Libellé en lettres' })
  @ApiProperty()
  libelle: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Un type de certificqtion est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le type' })
  @IsString({ message: 'Type en lettres' })
  type: string;

  @ApiProperty()
  @IsDateString({}, { message: 'Format de date de fin incorrect' })
  date_obtention: Date;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: 'compte associe non fourni' })
  compte_id: number;
}
