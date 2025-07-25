import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { CompteService } from 'src/compte/compte.service';


@Module({
  
  controllers: [ExperienceController],
  providers: [ExperienceService,CompteService]
})
export class ExperienceModule {}
