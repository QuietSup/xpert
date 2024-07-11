import { Module } from '@nestjs/common';
import { AuthModule } from 'src/main/auth/auth.module';
import { ClassificationHistoryModule } from 'src/main/classification-history/classification-history.module';
import { FeedbacksModule } from 'src/main/feedbacks/feedbacks.module';
import { OcrModule } from 'src/main/ocr/ocr.module';
import { TopicClassifierModule } from 'src/main/topic-classifier/topic.classifier.module';
import { UsersModule } from 'src/main/users/users.module';

@Module({
  imports: [
    TopicClassifierModule,
    OcrModule,
    AuthModule,
    UsersModule,
    ClassificationHistoryModule,
    FeedbacksModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
