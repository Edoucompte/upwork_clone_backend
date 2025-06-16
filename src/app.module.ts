import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompteModule } from './compte/compte.module';
import { AdresseModule } from './adresse/adresse.module';
import { LangueModule } from './langue/langue.module';
import { CertificationModule } from './certification/certification.module';
import { FichierModule } from './fichier/fichier.module';
import { FormationModule } from './formation/formation.module';
import { CompetenceModule } from './competence/competence.module';
import { FormationModule } from './formation/formation.module';
import { LangueModule } from './langue/langue.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    CompteModule,
    AdresseModule,
    LangueModule,
    FormationModule,
    CompetenceModule,
    FormationModule,
    LangueModule,
    FichierModule,
    CertificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
