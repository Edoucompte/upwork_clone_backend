import { Module } from '@nestjs/common';
import { AdresseController } from './adresse.controller';
import { AdresseService } from './adresse.service';

@Module({
  controllers: [AdresseController],
  providers: [AdresseService]
})
export class AdresseModule {}
