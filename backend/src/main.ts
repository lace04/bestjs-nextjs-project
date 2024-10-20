import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Establecer un prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api');

  // Habilitar CORS para permitir peticiones desde localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  // Configuración global del ValidationPipe para manejar validaciones en DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no permitidas
      transform: true,           // Transforma los payloads JSON en instancias de las clases DTO
    }),
  );

  // Configuración de Swagger para documentación de la API
  const config = new DocumentBuilder()
    .setTitle('Products example')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}

bootstrap();
