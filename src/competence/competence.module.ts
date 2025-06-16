import { Module } from '@nestjs/common';
import { CompetenceController } from './competence.controller';
import { CompetenceService } from './competence.service';
import { CompteService } from 'src/compte/compte.service';

@Module({
  controllers: [CompetenceController, CompteService],
  providers: [CompetenceService],
})
export class CompetenceModule {}
