import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthProxyService } from 'src/main/auth/auth-proxy/auth-proxy.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
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

          queue: 'auth-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AuthProxyService],
  exports: [AuthProxyService],
})
export class AuthProxyModule {}
