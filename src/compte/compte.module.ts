import { Module } from '@nestjs/common';
import { CompteController } from './compte.controller';
import { CompteService } from './compte.service';

@Module({
  providers: [CompteService],
  controllers: [CompteController],
})
export class CompteModule {}
