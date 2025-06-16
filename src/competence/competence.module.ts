import { Module } from '@nestjs/common';
import { CompetenceController } from './competence.controller';
import { CompetenceService } from './competence.service';

@Module({
  controllers: [CompetenceController],
  providers: [CompetenceService]
})
export class CompetenceModule {}
