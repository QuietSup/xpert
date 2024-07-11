import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FeedbacksProxyService {
  constructor(
    @Inject('FEEDBACKS_SERVICE')
    private readonly feedbacksClient: ClientProxy,
  ) {}

  create(feedback: {
    text?: string;
    satisfied?: boolean;
    result?: string;
    bestTopic?: string;
  }): void {
    this.feedbacksClient.emit({ cmd: 'create-feedback' }, feedback);
  }
}
