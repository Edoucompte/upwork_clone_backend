import { PartialType } from '@nestjs/swagger';
import { CreateAdresseDto } from './create-adresse.dto';

export class UpdateAdresseDto extends PartialType(CreateAdresseDto) {}
