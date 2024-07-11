import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserRequest } from 'src/dto/requests/create-user.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create' })
  create(@Payload() user: CreateUserRequest): any {
    return this.appService.create(user);
  }

  @MessagePattern({ cmd: 'get-all' })
  getAll(): any {
    return this.appService.getAll();
  }

  @MessagePattern({ cmd: 'get-by-id' })
  getById(@Payload() id: string): any {
    return this.appService.getById(id);
  }

  @MessagePattern({ cmd: 'get-by-email' })
  getByEmail(@Payload() email: string): any {
    return this.appService.getByEmail(email);
  }

  @MessagePattern({ cmd: 'check-password' })
  checkPassword(@Payload() data: { email: string; password: string }): any {
    return this.appService.checkPassword(data.email, data.password);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: string): any {
    return this.appService.delete(id);
  }
}
