import { Module } from '@nestjs/common';
/*import { AppController } from './app.controller';
import { AppService } from './app.service';*/
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CompteModule } from './compte/compte.module';
import { FichierModule } from './fichier/fichier.module';
import { FormationModule } from './formation/formation.module';
import { LangueModule } from './langue/langue.module';
import { CertificationModule } from './certification/certification.module';
import { AdresseModule } from './adresse/adresse.module';
import { CompetenceModule } from './competence/competence.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    CompteModule,
    FichierModule,
    AdresseModule,
    LangueModule,
    FormationModule,
    CompetenceModule,
    FormationModule,
    LangueModule,
    CertificationModule,
    PortfolioModule,
    ExperienceModule,
  ],
  /*controllers: [AppController],
  providers: [AppService],*/
})
export class AppModule {}
