import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['https://webs-integrate.vercel.app', 'http://localhost:3000'],
      methods: 'GET,POST',
      allowedHeaders:
        'Content-Type,Authorization,x-apollo-operation-name,apollo-require-preflight',
    }),
  );

  app.enableCors({
    origin: ['https://webs-integrate.vercel.app', 'http://localhost:3000'],
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3000);
}
bootstrap();
