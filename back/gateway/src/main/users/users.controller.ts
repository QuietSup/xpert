import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReqTokens } from 'src/main/auth/decorators/req-tokens.decorator';
import { ReqUser } from 'src/main/auth/decorators/req-user.decorator';
import { JwtAccessGuard } from 'src/main/auth/guards/jwt-access.guard';
import { JwtRefreshGuard } from 'src/main/auth/guards/jwt-refresh.guard';
import { UsersService } from 'src/main/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() user: { email: string; password: string; username: string },
  ): any {
    return this.usersService.create(user);
  }

  @Post('register')
  register(
    @Body() user: { email: string; password: string; username: string },
  ) {
    console.log(user);
    return this.usersService.register(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-tokens')
  refreshTokens(@ReqTokens() tokens: any): any {
    return tokens;
  }

  @UseGuards(JwtAccessGuard)
  @Get('me')
  async getMe(@ReqUser() user: any) {
    const usr = await this.usersService.getById(user.userId);

    return { ...usr, userId: user.userId };
  }

  @Get()
  getAll(): any {
    return this.usersService.getAll();
  }

  @Get('email/:email')
  getByEmail(@Param('email') email: string): any {
    return this.usersService.getByEmail(email);
  }

  @Get(':id')
  getById(@Param('id') id: string): any {
    return this.usersService.getById(id);
  }

  // @Post('login')
  // checkPassword(@Body() data: { email: string; password: string }): any {
  //   return this.usersService.checkPassword(data.email, data.password);
  // }

  @Delete(':id')
  delete(@Param('id') id: string): any {
    return this.usersService.delete(id);
  }

  @Post('login')
  login(@Body() data: { email: string; password: string }): any {
    return this.usersService.login(data);
  }
}
