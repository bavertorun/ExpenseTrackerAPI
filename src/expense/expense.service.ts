import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schemas/Expense.schema';
import { Model } from 'mongoose';
import { ExpenseDTO } from './dto/Expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
  ) {}
  async getAllExpenses() {
    const expenses = await this.expenseModel.find().exec();
    return expenses;
  }
  async getOneExpense(expenseId: string) {
    const expense = await this.expenseModel.findById(expenseId);
    return expense;
  }
  async createExpense(body: ExpenseDTO) {
    const newExpense = await this.expenseModel.create(body);
    return newExpense;
  }
  async updateExpense(id: string, body: ExpenseDTO) {
    const updateExpense = this.expenseModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updateExpense;
  }
}
