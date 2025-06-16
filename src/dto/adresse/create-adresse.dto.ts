import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdresseDto {
  @IsNotEmpty()
  @IsString()
  pays: string;

  @IsNotEmpty()
  @IsString()
  ville: string;

  @IsNotEmpty()
  @IsString()
  quartier: string;

  @IsNotEmpty()
  @IsString()
  code_postal: string;

  @IsNotEmpty()
  user_id: number;
}
