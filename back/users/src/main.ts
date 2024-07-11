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
        queue: 'users-queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     forbidUnknownValues: true,
  //     disableErrorMessages: true,
  //     exceptionFactory: (errors) => {
  //       return new CodeException(errors.join('; '), 400);
  //     },
  //   }),
  // );

  // app.useGlobalFilters(new ExceptionFilter());

  await app.listen();
}
bootstrap();
