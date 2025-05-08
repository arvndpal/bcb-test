import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Transaction, TransactionUpdateType } from './types/types';

@Controller('transaction')
export class AppController {
  constructor(private readonly appService: AppService) {}
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  getAllTransaction(): Promise<Transaction[]> {
    return this.appService.getAllTransaction();
  }

  @Post()
  async createTransaction(@Body() data: Transaction): Promise<string> {
    return await this.appService.createTransaction(data);
  }
  @Get('history/:id')
  async getHistoryById(@Param('id') id: string): Promise<string> {
    console.log('getHistoryById');
    return this.appService.getHistoryById(id);
  }

  @Get('/allStatus')
  async getStatusAll(): Promise<Record<string, string[]>> {
    return this.appService.getAllTransactionStatus();
  }

  @Get(':id')
  async getStatusById(@Param('id') id: string): Promise<string> {
    return this.appService.getStatusById(id);
  }

  @Patch(':id')
  async updateTransactionById(
    @Param('id') id: string,
    @Body() body: TransactionUpdateType,
  ): Promise<string> {
    return this.appService.updateTransactionById(id, body);
  }
}
