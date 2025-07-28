import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Import Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Frontend autorisé
    credentials: true, // Si tu utilises les cookies ou les headers Authorization
  });

  // pour les validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  //Serve static files from the 'uploads' directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Optional: URL prefix for accessing files
  });

  app.use(cookieParser());

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Upwork Clone') // Titre de la doc
    .setDescription('API pour gérer les comptes sur upwork') // Description
    .setVersion('1.0') // Version de l'API
    .addBearerAuth() // Si tu utilises JWT, tu peux activer ça
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // L'URL de la doc : http://localhost:3000/api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
