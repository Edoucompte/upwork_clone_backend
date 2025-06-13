import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetUserPasswordDto {
  @IsNotEmpty({ message: 'Mot de passe à fournir' })
  @MinLength(8, { message: "Mot de passe d'au moins 8 caractères" })
  password: string;

  @IsString({
    message: 'Prénom à fournir',
  })
  @IsNotEmpty({
    message: 'Token est à fournir',
  })
  token: string;
}
