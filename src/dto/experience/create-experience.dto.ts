// src/experience/dto/experience.dto.ts

import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  titre: string;

  @IsString()
  entreprise: string;

  @IsString()
  emplacement: string;

  @IsString()
  pays: string;

  @IsBoolean()
  travailleActuellement: boolean;

  @IsString()
  dateDebut: string;

  @IsOptional()
  @IsString()
  dateFin?: string;

  @IsString()
  description: string;

  @IsInt()
  compte_id: number;
}

