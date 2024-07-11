import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TopicClassifierProxyService {
  constructor(
    @Inject('TOPIC_CLASSIFIER_SERVICE')
    private readonly topicClassifierClientProxyService: ClientProxy,
  ) {}

  async classifyTopic(text: string) {
    console.log('classifyTopic', text);
    return this.topicClassifierClientProxyService.send(
      { cmd: 'text-classify-queue' },
      { text },
    );
  }
}
