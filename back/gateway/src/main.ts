import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'src/exception-filter';
// import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ allowedHeaders: '*' });

  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3010);
}
bootstrap();
