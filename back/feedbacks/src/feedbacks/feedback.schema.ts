import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema({ timestamps: true })
export class Feedback {
  @Prop()
  text: string;

  @Prop()
  result: string;

  @Prop()
  satisfied: boolean;

  @Prop()
  bestTopic: string;

  createdAt: Date;

  updatedAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
