import { Module } from '@nestjs/common';
import { TopicClassifierProxyModule } from 'src/main/topic-classifier/topic-classifier-proxy/topic-classifier-proxy.module';
import { TopicClassifierController } from 'src/main/topic-classifier/topic-classifier.controller';
import { TopicClassifierService } from 'src/main/topic-classifier/topic-classifier.service';

@Module({
  imports: [TopicClassifierProxyModule],
  controllers: [TopicClassifierController],
  providers: [TopicClassifierService],
})
export class TopicClassifierModule {}
