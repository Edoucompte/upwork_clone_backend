import { Module } from '@nestjs/common';
import { FichierService } from './fichier.service';
import { FichierController } from './fichier.controller';

@Module({
  providers: [FichierService],
  controllers: [FichierController],
})
export class FichierModule {}
