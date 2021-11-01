import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: '0.00' })
  balance: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  eyeColor: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: string;

  @Prop()
  company: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
