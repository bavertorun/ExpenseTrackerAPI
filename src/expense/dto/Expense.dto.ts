import { IsNotEmpty } from 'class-validator';

export class ExpenseDTO {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  date: string;
  @IsNotEmpty()
  description: string;
}
