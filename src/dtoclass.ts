import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

//classe de validation pour la creation d'un utilisateur et la connexion
export class CreateUserDto {
  @IsNotEmpty()
  prenom: string;

  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  pays: string;
}

//classe de validation pour  la connexion
export class LoginUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  }