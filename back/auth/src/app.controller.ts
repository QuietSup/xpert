import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserDataDto } from 'src/dto/user-data.dto';
import { Tokens } from 'src/interfaces/tokens.interface';
import { Payload } from 'src/interfaces/payload.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'generate-tokens' })
  async generateTokens(data: UserDataDto): Promise<false | Tokens> {
    return await this.appService.generateTokens(data.userId, data.email);
  }

  @MessagePattern({ cmd: 'verify-access-token' })
  verifyAccessToken(token: string): Promise<false | Payload> {
    return this.appService.verifyAccessToken(token);
  }

  @MessagePattern({ cmd: 'update-tokens' })
  updateTokens(refreshToken: string): Promise<false | Tokens> {
    return this.appService.updateTokens(refreshToken);
  }
}
