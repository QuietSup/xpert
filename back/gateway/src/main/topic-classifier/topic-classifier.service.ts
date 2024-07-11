import { Injectable } from '@nestjs/common';
import { TopicClassifierProxyService } from 'src/main/topic-classifier/topic-classifier-proxy/topic-classifier-proxy.service';

@Injectable()
export class TopicClassifierService {
  constructor(
    private readonly topicClassifierClientProxyService: TopicClassifierProxyService,
  ) {}

  async classifyTopic(text: string) {
    return this.topicClassifierClientProxyService.classifyTopic(text);
  }
}
