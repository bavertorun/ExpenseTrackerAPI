import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schemas/Expense.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
    constructor(@InjectModel(Expense.name) private readonly expenseModel: Model<Expense>){}
    async getAllExpenses(){
        const expenses = await this.expenseModel.find().exec();
        return expenses;
    }
    async getOneExpense(expenseId:string){
        const expense = await this.expenseModel.findById(expenseId);
        return expense;
    }

}
