import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from 'src/feedbacks/feedback.schema';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<Feedback>,
  ) {}

  create(feedback: {
    text?: string;
    satisfied?: boolean;
    result?: string;
    bestTopic?: string;
  }) {
    const createdFeedback = new this.feedbackModel(feedback);
    console.log('Created feedback:', createdFeedback);
    createdFeedback.save();
  }
}
