import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateCompteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  titre_compte: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  taux_horaire: number; // ou Date string ISO ex: '2025-06-11T12:00:00Z'

  @ApiProperty()
  @IsOptional()
  @IsInt()
  profil_id?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
