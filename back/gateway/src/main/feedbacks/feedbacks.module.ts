import { Module } from '@nestjs/common';
import { FeedbacksProxyModule } from 'src/main/feedbacks/feedbacks-proxy/feedbacks-proxy.module';
import { FeedbacksController } from 'src/main/feedbacks/feedbacks.controllers';
import { FeedbacksService } from 'src/main/feedbacks/feedbacks.service';

@Module({
  imports: [FeedbacksProxyModule],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
