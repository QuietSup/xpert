import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassificationHistoryProxyService } from 'src/main/classification-history/classification-history-proxy/classification-history-proxy.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLHISTORY_SERVICE',
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
    ]),
  ],
  controllers: [],
  providers: [ClassificationHistoryProxyService],
  exports: [ClassificationHistoryProxyService],
})
export class ClassificationHistoryProxyModule {}
