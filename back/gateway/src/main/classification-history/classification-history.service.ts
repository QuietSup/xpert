import { Injectable } from '@nestjs/common';
import { ClassificationHistoryProxyService } from 'src/main/classification-history/classification-history-proxy/classification-history-proxy.service';

@Injectable()
export class ClassificationHistoryService {
  constructor(
    private readonly classificationHistoryProxyService: ClassificationHistoryProxyService,
  ) {}

  createRecord(record: {
    userId: string;
    code: string;
    result: string;
    text: string;
  }) {
    return this.classificationHistoryProxyService.createRecord(record);
  }

  getRecordsByUser(userId: string) {
    return this.classificationHistoryProxyService.getRecordsByUser(userId);
  }

  deleteRecord(userId: string, recordId: string) {
    return this.classificationHistoryProxyService.deleteRecord(
      userId,
      recordId,
    );
  }
}
