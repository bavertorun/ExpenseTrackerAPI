import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>

@Schema()
export class Expense {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);