import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Attempt {
  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop()
  triggered: boolean;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
