import { Module } from '@nestjs/common';
import { CompteController } from './compte.controller';
import { CompteService } from './compte.service';

@Module({
  providers: [CompteService],
  controllers: [CompteController],
  exports: [CompteService],
})
export class CompteModule {}
