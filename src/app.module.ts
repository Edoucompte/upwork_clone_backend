import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FormationModule } from './formation/formation.module';
import { LangueModule } from './langue/langue.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, FormationModule, LangueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
