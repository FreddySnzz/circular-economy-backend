import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
      'qh-user-id',
    ],
    exposedHeaders: ['Authorization'],
    credentials: true,
    origin: true,
  });

  await app.listen(8080);
}
bootstrap();
