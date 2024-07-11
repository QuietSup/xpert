import { Module } from '@nestjs/common';
import { ClassificationHistoryProxyModule } from 'src/main/classification-history/classification-history-proxy/classification-history-proxy.module';
import { ClassificationHistoryController } from 'src/main/classification-history/classification-history.controller';
import { ClassificationHistoryService } from 'src/main/classification-history/classification-history.service';

@Module({
  imports: [ClassificationHistoryProxyModule],
  controllers: [ClassificationHistoryController],
  providers: [ClassificationHistoryService],
  exports: [ClassificationHistoryService],
})
export class ClassificationHistoryModule {}
