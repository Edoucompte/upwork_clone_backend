import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { CompteService } from 'src/compte/compte.service';
import { FichierService } from 'src/fichier/fichier.service';

@Module({
  providers: [CertificationService, CompteService, FichierService],
  controllers: [CertificationController],
})
export class CertificationModule {}
