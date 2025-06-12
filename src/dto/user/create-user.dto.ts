import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Un prenom est requis pour cette action',
  })
  @MinLength(2, { message: 'Entrez au moins 2 caracteres pour le prenom' })
  @IsString()
  prenom: string;

  @IsNotEmpty({ message: 'Un nom est requis pour cette action' })
  @MinLength(2, {
    message: 'Entrez au moins 2 caracteres pour le nom',
  })
  @IsString()
  nom: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsNotEmpty({
    message: 'Un mot de passe est requis pour cette action',
  })
  @MinLength(6, {
    message: 'Entrez au moins 6 caracteres pour le mot de passe',
  })
  //@IsString()
  password: string;

  @IsNotEmpty({
    message: 'Un pays est requis pour cette action',
  })
  @IsString({ message: 'Pays Invalide. Entrez une chaine de caractere' })
  pays: string;
}
