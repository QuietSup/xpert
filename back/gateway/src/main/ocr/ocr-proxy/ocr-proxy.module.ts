import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OcrProxyService } from 'src/main/ocr/ocr-proxy/ocr-proxy.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OCR_SERVICE',
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
      },
    ]),
  ],
  controllers: [],
  providers: [OcrProxyService],
  exports: [OcrProxyService],
})
export class OcrProxyModule {}
