import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RecordsService } from 'src/records/records.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly recordsService: RecordsService,
  ) {}

  @MessagePattern({ cmd: 'create-record' })
  async createRecord(@Payload() record: any) {
    console.log('creating record', record);
    return this.recordsService.create(record);
  }

  @MessagePattern({ cmd: 'get-records-by-user' })
  async getRecordsByUser(@Payload() userId: string) {
    return this.recordsService.getByUser(userId);
  }

  @MessagePattern({ cmd: 'delete-record' })
  async deleteRecord(@Payload() { userId, recordId }: any) {
    return this.recordsService.deleteRecord(userId, recordId);
  }
}
