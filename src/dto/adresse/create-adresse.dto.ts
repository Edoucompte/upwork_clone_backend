import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdresseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pays: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quartier: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code_postal: string;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;
}
