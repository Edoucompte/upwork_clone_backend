import { Module } from '@nestjs/common';
import { LangueController } from './langue.controller';
import { LangueService } from './langue.service';

@Module({
  controllers: [LangueController],
  providers: [LangueService],
})
export class LangueModule {}
