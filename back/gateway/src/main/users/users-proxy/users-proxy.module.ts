import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersProxyService } from 'src/main/users/users-proxy/users-proxy.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
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
    ]),
  ],
  controllers: [],
  providers: [UsersProxyService],
  exports: [UsersProxyService],
})
export class UsersProxyModule {}
