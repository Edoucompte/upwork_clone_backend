import { Module } from '@nestjs/common';
import { LangueService } from './langue.service';
import { LangueController } from './langue.controller';

@Module({
  providers: [LangueService],
  controllers: [LangueController]
})
export class LangueModule {}
