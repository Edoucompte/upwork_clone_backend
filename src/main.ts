import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Import Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuration Swagger
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('API Utilisateurs')        // Titre de la doc
    .setDescription('API pour gérer les utilisateurs')  // Description
    .setVersion('1.0')                   // Version de l'API
    //.addBearerAuth()                   // Si tu utilises JWT, tu peux activer ça
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // L'URL de la doc : http://localhost:3000/api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


  

 

