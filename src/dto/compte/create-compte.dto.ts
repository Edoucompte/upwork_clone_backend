import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateCompteDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  titre_compte: string;

  @IsDateString()
  @IsNotEmpty()
  taux_horaire: number; // ou Date string ISO ex: '2025-06-11T12:00:00Z'

  @IsOptional()
  @IsInt()
  profil_id?: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
