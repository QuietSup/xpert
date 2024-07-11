import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
} from 'src/main/users/users-proxy/dto/create-user.dto';
import { ErrorResponse } from 'src/main/users/users-proxy/dto/error.dto';

@Injectable()
export class UsersProxyService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  create(user: CreateUserRequest): Promise<CreateUserResponse | ErrorResponse> {
    const result = this.usersClient.send({ cmd: 'create' }, user);
    return lastValueFrom(result);
  }

  getAll(): Promise<any> {
    return lastValueFrom(this.usersClient.send({ cmd: 'get-all' }, ''));
  }

  getByEmail(email: string): Promise<any> {
    return lastValueFrom(this.usersClient.send({ cmd: 'get-by-email' }, email));
  }

  checkPassword(
    email: string,
    password: string,
  ): Promise<{ _id: string; username: string; email: string }> {
    return lastValueFrom(
      this.usersClient.send({ cmd: 'check-password' }, { email, password }),
    );
  }

  getById(id: string): Promise<any> {
    return lastValueFrom(this.usersClient.send({ cmd: 'get-by-id' }, id));
  }

  delete(id: string): Promise<any> {
    return lastValueFrom(this.usersClient.send({ cmd: 'delete' }, id));
  }
}
