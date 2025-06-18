import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { CompteService } from 'src/compte/compte.service';

@Module({
  providers: [PortfolioService, CompteService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
