import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateCompetenceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  competence: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  compte_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  portfolio_id?: number;
}
