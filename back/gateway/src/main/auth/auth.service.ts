import { Injectable } from '@nestjs/common';
import { AuthProxyService } from 'src/main/auth/auth-proxy/auth-proxy.service';

@Injectable()
export class AuthService {
  constructor(private readonly authProxyService: AuthProxyService) {}

  async generateTokens(data: { userId: string; email: string }) {
    return this.authProxyService.generateTokens(data);
  }
}
