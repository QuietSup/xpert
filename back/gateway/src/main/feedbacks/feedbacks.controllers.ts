import { Body, Controller, Post } from '@nestjs/common';
import { FeedbacksService } from 'src/main/feedbacks/feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  createFeedback(
    @Body()
    feedback: {
      text?: string;
      satisfied?: boolean;
      result?: string;
      bestTopic?: string;
    },
  ) {
    console.log('Creating feedback:', feedback);
    this.feedbacksService.create(feedback);
  }
}
