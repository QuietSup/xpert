import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Tokens } from 'src/main/auth/auth-proxy/interfaces/tokens.interface';
import { AuthService } from 'src/main/auth/auth.service';
import { CreateUserResponse } from 'src/main/users/users-proxy/dto/create-user.dto';
import { ErrorResponse } from 'src/main/users/users-proxy/dto/error.dto';
import { UsersProxyService } from 'src/main/users/users-proxy/users-proxy.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersProxyService: UsersProxyService,
    private readonly authService: AuthService,
  ) {}

  create(user: { email: string; password: string; username: string }): any {
    return this.usersProxyService.create(user);
  }

  async register(user: {
    email: string;
    password: string;
    username: string;
  }): Promise<Tokens> {
    const newUserOrError = await this.usersProxyService.create(user);

    console.log('register', newUserOrError);

    if (newUserOrError.hasOwnProperty('error')) {
      throw new BadGatewayException((newUserOrError as ErrorResponse).error);
    }
    const newUser = newUserOrError as CreateUserResponse;
    // console.log('register2', newUser);

    const tokens = await this.authService.generateTokens({
      userId: newUser._id,
      email: newUser.email,
    });
    // console.log('tokens', tokens);

    if (!tokens) {
      throw new BadGatewayException();
    }

    return tokens;
  }

  getAll(): any {
    return this.usersProxyService.getAll();
  }

  getByEmail(email: string): any {
    return this.usersProxyService.getByEmail(email);
  }

  getById(id: string): any {
    return this.usersProxyService.getById(id);
  }

  checkPassword(email: string, password: string): any {
    return this.usersProxyService.checkPassword(email, password);
  }

  delete(id: string): any {
    return this.usersProxyService.delete(id);
  }

  async login(user: { email: string; password: string }) {
    // throw new Error('my err');

    const userFromDb = await this.usersProxyService.checkPassword(
      user.email,
      user.password,
    );

    if (!userFromDb) {
      throw new UnauthorizedException();
    }

    return this.authService.generateTokens({
      email: userFromDb.email,
      userId: userFromDb._id,
    });
  }
}
