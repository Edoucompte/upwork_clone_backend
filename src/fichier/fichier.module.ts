import { Module } from '@nestjs/common';
import { FichierService } from './fichier.service';
import { FichierController } from './fichier.controller';
import { CertificationService } from 'src/certification/certification.service';

@Module({
  providers: [FichierService, CertificationService],
  controllers: [FichierController],
})
export class FichierModule {}
