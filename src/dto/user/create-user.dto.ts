import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Un prenom est requis pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le prenom' })
  @IsString()
  @ApiProperty()
  prenom: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Un nom est requis pour cette action' })
  @MinLength(2, {
    message: 'Entrez au moins 2 caracteres pour le nom',
  })
  @IsString()
  nom: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Un mot de passe est requis pour cette action',
  })
  @MinLength(6, {
    message: 'Entrez au moins 6 caracteres pour le mot de passe',
  })
  //@IsString()
  password: string;


  @IsNotEmpty()
  @IsString()
  role: string; 

  @ApiProperty()
  @IsNotEmpty({
    message: 'Un pays est requis pour cette action',
  })
  @IsString({ message: 'Pays Invalide. Entrez une chaine de caractere' })
  pays: string;
}
