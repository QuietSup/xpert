import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from 'src/feedbacks/feedback.schema';
import { FeedbacksService } from 'src/feedbacks/feedbacks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  controllers: [],
  providers: [FeedbacksService],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
