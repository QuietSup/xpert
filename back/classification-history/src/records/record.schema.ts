import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecordDocument = HydratedDocument<Record>;

@Schema({ timestamps: true })
export class Record {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  result: string;

  @Prop({ required: true })
  text: string;

  createdAt: Date;

  updatedAt: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
