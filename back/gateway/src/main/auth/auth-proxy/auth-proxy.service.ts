import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Payload } from 'src/main/auth/auth-proxy/interfaces/payload.interface';
import { Tokens } from 'src/main/auth/auth-proxy/interfaces/tokens.interface';

@Injectable()
export class AuthProxyService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClientProxyService: ClientProxy,
  ) {}

  async generateTokens(data: {
    userId: string;
    email: string;
  }): Promise<false | Tokens> {
    const response = await this.authClientProxyService.send(
      { cmd: 'generate-tokens' },
      data,
    );

    return lastValueFrom(response);
  }

  async verifyAccessToken(token: string): Promise<false | Payload> {
    const response = await this.authClientProxyService.send(
      { cmd: 'verify-access-token' },
      token,
    );
    return lastValueFrom(response);
  }

  async updateTokens(refreshToken: string): Promise<false | Tokens> {
    const response = await this.authClientProxyService.send(
      { cmd: 'update-tokens' },
      refreshToken,
    );
    return lastValueFrom(response);
  }
}
