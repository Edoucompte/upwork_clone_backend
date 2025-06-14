import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Un mot de passe est requis pour cette action' })
  @MinLength(6, {
    message: 'Entrez au moins 6 caracteres pour le mot de passe',
  })
  password: string;
}
