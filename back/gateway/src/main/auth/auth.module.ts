import { Module } from '@nestjs/common';
import { AuthProxyModule } from 'src/main/auth/auth-proxy/auth-proxy.module';
import { AuthService } from 'src/main/auth/auth.service';
import { JwtAccessGuard } from 'src/main/auth/guards/jwt-access.guard';
import { JwtRefreshGuard } from 'src/main/auth/guards/jwt-refresh.guard';

// @Global()
@Module({
  imports: [AuthProxyModule],
  controllers: [],
  providers: [JwtAccessGuard, JwtRefreshGuard, AuthService],
  exports: [JwtAccessGuard, JwtRefreshGuard, AuthService],
})
export class AuthModule {}
