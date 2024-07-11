import { Module } from '@nestjs/common';
import { AuthModule } from 'src/main/auth/auth.module';
import { UsersProxyModule } from 'src/main/users/users-proxy/users-proxy.module';
import { UsersController } from 'src/main/users/users.controller';
import { UsersService } from 'src/main/users/users.service';

@Module({
  imports: [UsersProxyModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
