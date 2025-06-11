import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

export class LoginUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  }