import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          {
            hostname: 'rabbitmq',
            port: 5672,
            password: 'root',
            username: 'root',
          },
        ],
        queue: 'clhistory-queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen();
}
bootstrap();
