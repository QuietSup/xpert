import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FeedbacksProxyService } from 'src/main/feedbacks/feedbacks-proxy/feedbacks-proxy.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FEEDBACKS_SERVICE',
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
    ]),
  ],
  controllers: [],
  providers: [FeedbacksProxyService],
  exports: [FeedbacksProxyService],
})
export class FeedbacksProxyModule {}
