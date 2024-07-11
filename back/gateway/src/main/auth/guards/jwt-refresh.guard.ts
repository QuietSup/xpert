import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProxyService } from 'src/main/auth/auth-proxy/auth-proxy.service';

@Injectable()
export class JwtRefreshGuard {
  constructor(private readonly authProxyService: AuthProxyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const tokens = await this.authProxyService.updateTokens(token);
    if (!tokens) {
      throw new UnauthorizedException('Unauthorized');
    }

    request.tokens = tokens;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
