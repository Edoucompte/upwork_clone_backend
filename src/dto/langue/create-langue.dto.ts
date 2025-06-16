import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateLangueDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Un nom de langue est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour la langue' })
  @IsString({ message: 'Nom de langue en lettres' })
  nom: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Un niveau de langue est recquis',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour la niveau' })
  @IsString({ message: 'Niveau de langue en lettres' })
  niveau: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: 'compte associe non fourni' })
  compte_id: number;
}
