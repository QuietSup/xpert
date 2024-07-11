import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
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
      queue: 'extract-text-from-image',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
}
bootstrap();
