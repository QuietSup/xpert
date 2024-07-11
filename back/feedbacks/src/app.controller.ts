import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { FeedbacksService } from 'src/feedbacks/feedbacks.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly feedbacksService: FeedbacksService,
  ) {}

  @EventPattern({ cmd: 'create-feedback' })
  createFeedback(feedback: {
    text?: string;
    satisfied?: boolean;
    result?: string;
    bestTopic?: string;
  }) {
    this.feedbacksService.create(feedback);
  }
}
