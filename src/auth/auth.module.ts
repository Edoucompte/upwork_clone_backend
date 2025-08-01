import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from 'src/user/mailer.service';
import { CompteModule } from 'src/compte/compte.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // generate secret hash
      signOptions: { expiresIn: '3600s' },
    }),
    CompteModule,
  ],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
    MailerService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
