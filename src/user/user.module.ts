import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY', // met ça dans un .env après
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [   UserService],
  controllers: [UserController]
})
export class UserModule {}
