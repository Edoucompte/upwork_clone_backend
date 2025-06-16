import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';
import { CompteService } from 'src/compte/compte.service';

@Module({
  controllers: [FormationController, CompteService],
  providers: [FormationService],
})
export class FormationModule {}
