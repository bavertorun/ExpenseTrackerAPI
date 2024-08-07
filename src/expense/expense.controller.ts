import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseDTO } from './dto/Expense.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async getAllExpenses() {
    return this.expenseService.getAllExpenses();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOneExpense(@Param('id') expenseId: string) {
    return this.expenseService.getOneExpense(expenseId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createExpense(@Body() body: ExpenseDTO) {
    return this.expenseService.createExpense(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async updateExpense(@Param('id') id: string, @Body() body: ExpenseDTO) {
    return this.expenseService.updateExpense(id, body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  async deleteExpense(@Param('id') id: string){
    return this.expenseService.deleteExpense(id);
  }
}
