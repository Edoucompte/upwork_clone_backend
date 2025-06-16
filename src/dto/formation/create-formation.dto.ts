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
