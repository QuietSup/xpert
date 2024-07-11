import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
        queue: 'feedbacks-queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
