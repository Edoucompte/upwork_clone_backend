import { Module } from '@nestjs/common';
import { CompetenceController } from './competence.controller';
import { CompetenceService } from './competence.service';
import { CompteService } from 'src/compte/compte.service';

@Module({
  controllers: [CompetenceController],
  providers: [CompetenceService, CompteService],
})
export class CompetenceModule {}
