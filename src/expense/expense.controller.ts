import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseDTO } from './dto/Expense.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Get('')
  async getAllExpenses() {
    return this.expenseService.getAllExpenses();
  }
  @Get(':id')
  async getOneExpense(@Param('id') expenseId: string) {
    return this.expenseService.getOneExpense(expenseId);
  }
  @Post('create')
  async createExpense(@Body() body: ExpenseDTO) {
    return this.expenseService.createExpense(body);
  }
  @Put('update/:id')
  async updateExpense(@Param('id') id: string, @Body() body: ExpenseDTO) {
    return this.expenseService.updateExpense(id, body);
  }
  @Delete('delete/:id')
  async deleteExpense(@Param('id') id: string){
    return this.expenseService.deleteExpense(id);
  }
}
