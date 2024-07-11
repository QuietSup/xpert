import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TopicClassifierProxyService } from 'src/main/topic-classifier/topic-classifier-proxy/topic-classifier-proxy.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TOPIC_CLASSIFIER_SERVICE',
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

          queue: 'text-classify-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [TopicClassifierProxyService],
  exports: [TopicClassifierProxyService],
})
export class TopicClassifierProxyModule {}
