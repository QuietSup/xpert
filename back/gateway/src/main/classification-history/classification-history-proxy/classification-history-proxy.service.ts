import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClassificationHistoryProxyService {
  constructor(
    @Inject('CLHISTORY_SERVICE')
    private readonly classificationHistoryClientProxyService: ClientProxy,
  ) {}

  async getAllClassifications() {
    const res = this.classificationHistoryClientProxyService.send(
      { cmd: 'get-all-classifications' },
      {},
    );

    return lastValueFrom(res);
  }

  async createRecord(record: {
    userId: string;
    code: string;
    result: string;
    text: string;
  }) {
    const res = this.classificationHistoryClientProxyService.send(
      { cmd: 'create-record' },
      record,
    );

    return lastValueFrom(res);
  }

  async getRecordsByUser(userId: string) {
    const res = this.classificationHistoryClientProxyService.send(
      { cmd: 'get-records-by-user' },
      userId,
    );

    return lastValueFrom(res);
  }

  async deleteRecord(userId: string, recordId: string) {
    const res = this.classificationHistoryClientProxyService.send(
      { cmd: 'delete-record' },
      { userId, recordId },
    );

    return lastValueFrom(res);
  }
}
