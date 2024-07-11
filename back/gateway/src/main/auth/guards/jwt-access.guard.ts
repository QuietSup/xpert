import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProxyService } from 'src/main/auth/auth-proxy/auth-proxy.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    @Inject(AuthProxyService)
    private readonly authProxyService: AuthProxyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    console.log(request.headers['authorization']);

    const payload = await this.authProxyService.verifyAccessToken(token);
    if (!payload) {
      throw new UnauthorizedException('Unauthorized');
    }

    request.user = { userId: payload.sub, email: payload.email };

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
