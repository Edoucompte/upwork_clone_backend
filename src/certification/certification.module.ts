import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { CompteService } from 'src/compte/compte.service';

@Module({
  providers: [CertificationService, CompteService],
  controllers: [CertificationController],
})
export class CertificationModule {}
