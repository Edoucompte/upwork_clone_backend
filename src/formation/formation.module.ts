import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';
import { CompteService } from 'src/compte/compte.service';

@Module({
  controllers: [FormationController],
  providers: [FormationService, CompteService],
})
export class FormationModule {}
