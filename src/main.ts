import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';
// import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['https://webs-integrate.vercel.app', 'http://localhost:3000'],
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type, Authorization',
    }),
  );

  // Ensure CSRF protection is disabled in the GraphQL module
  app.enableCors({
    origin: ['https://webs-integrate.vercel.app', 'http://localhost:3000'],
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3000);
}
bootstrap();
