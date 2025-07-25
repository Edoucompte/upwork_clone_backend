// src/experience/dto/experience.dto.ts

import { IsString, IsBoolean, IsOptional} from 'class-validator';


export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  entreprise?: string;

  @IsOptional()
  @IsString()
  emplacement?: string;

  @IsOptional()
  @IsString()
  pays?: string;

  @IsOptional()
  @IsBoolean()
  travailleActuellement?: boolean;

  @IsOptional()
  @IsString()
  dateDebut?: string;

  @IsOptional()
  @IsString()
  dateFin?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
