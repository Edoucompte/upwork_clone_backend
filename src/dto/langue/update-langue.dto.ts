import { PartialType } from '@nestjs/mapped-types';
import { CreateLangueDto } from './create-langue.dto';


export class UpdateLangueDto extends PartialType(CreateLangueDto) {}