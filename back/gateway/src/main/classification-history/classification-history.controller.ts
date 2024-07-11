import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReqUser } from 'src/main/auth/decorators/req-user.decorator';
import { JwtAccessGuard } from 'src/main/auth/guards/jwt-access.guard';
import { ClassificationHistoryService } from 'src/main/classification-history/classification-history.service';

@Controller('clhistory')
export class ClassificationHistoryController {
  constructor(
    private readonly classificationHistoryService: ClassificationHistoryService,
  ) {}

  @UseGuards(JwtAccessGuard)
  @Post()
  async createRecord(
    @Body()
    record: {
      code: string;
      result: string;
      text: string;
    },
    @ReqUser() user: { userId: string; email: string },
  ) {
    const rec = { ...record, userId: user.userId };
    return this.classificationHistoryService.createRecord(rec);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  async getRecordsByUser(@ReqUser() user: { userId: string; email: string }) {
    console.log(user);
    return this.classificationHistoryService.getRecordsByUser(user.userId);
  }

  @UseGuards(JwtAccessGuard)
  @Delete(':recordId')
  async deleteRecord(
    @Param('recordId') recordId: string,
    @ReqUser() user: { userId: string; email: string },
  ) {
    return this.classificationHistoryService.deleteRecord(
      user.userId,
      recordId,
    );
  }
}
