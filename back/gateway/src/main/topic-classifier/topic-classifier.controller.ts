import { Controller, Post, Body } from '@nestjs/common';
import { TopicClassifierService } from 'src/main/topic-classifier/topic-classifier.service';

@Controller('topic-classifier')
export class TopicClassifierController {
  constructor(
    private readonly topicClassifierService: TopicClassifierService,
  ) {}

  @Post()
  async classifyTopic(@Body() classifyTopicDto: { text: string }) {
    const result = await this.topicClassifierService.classifyTopic(
      classifyTopicDto.text,
    );
    return result;
  }
}
