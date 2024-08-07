import { Controller, Get, Param } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService){}
    @Get('')
    async getAllExpenses(){
        return this.expenseService.getAllExpenses();
    }
    @Get(':id')
    async getOneExpense(@Param('id') expenseId: string){
        this.expenseService.getOneExpense(expenseId);
    }
}
