import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateLangueDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  niveau: string;

  @IsNotEmpty()
  @IsInt()
  compte_id: number;
}
