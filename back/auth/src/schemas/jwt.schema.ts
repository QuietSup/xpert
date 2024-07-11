import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JwtDocument = HydratedDocument<Jwt>;

@Schema()
export class Jwt {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [String], required: true })
  refreshTokens: string[];
}

export const JwtSchema = SchemaFactory.createForClass(Jwt);
