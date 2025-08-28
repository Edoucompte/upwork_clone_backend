// src/dto/skills.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateCompetencesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty()
  @IsString({ each: true })
  skills: string[];
}
