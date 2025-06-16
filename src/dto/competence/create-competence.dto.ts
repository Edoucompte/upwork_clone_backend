import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class CreateCompetenceDto {
  @IsNotEmpty()
  @IsString()
  competence: string;

  @IsOptional()
  @IsInt()
  compte_id?: number;

  @IsOptional()
  @IsInt()
  portfolio_id?: number;
}
