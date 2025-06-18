import { Module } from '@nestjs/common';
import { LangueController } from './langue.controller';
import { LangueService } from './langue.service';
import { CompteService } from 'src/compte/compte.service';

@Module({
  controllers: [LangueController],
  providers: [LangueService, CompteService],
})
export class LangueModule {}
