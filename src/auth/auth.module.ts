import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/user/mailer.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // generate secret hash
      signOptions: { expiresIn: '3600s' },
    }),
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
