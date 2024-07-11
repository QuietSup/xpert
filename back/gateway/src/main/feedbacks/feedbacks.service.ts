import { Injectable } from '@nestjs/common';
import { FeedbacksProxyService } from 'src/main/feedbacks/feedbacks-proxy/feedbacks-proxy.service';

@Injectable()
export class FeedbacksService {
  constructor(private readonly feedbacksProxyService: FeedbacksProxyService) {}

  create(feedback: {
    text?: string;
    satisfied?: boolean;
    result?: string;
    bestTopic?: string;
  }) {
    this.feedbacksProxyService.create(feedback);
  }
}
