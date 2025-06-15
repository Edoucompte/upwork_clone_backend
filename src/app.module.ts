import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompteModule } from './compte/compte.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, CompteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
