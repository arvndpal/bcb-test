import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { stringify } from 'csv-stringify';
import { Transaction, TransactionUpdateType } from './types/types';

@Injectable()
export class AppService {
  async readCsv(): Promise<Transaction[]> {
    const results: Transaction[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream('src/data/data.csv')
        .pipe(csv())
        .on('data', (data: Transaction) => results.push(data))
        .on('end', () => {
          // console.log(results);
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    return results;
  }

  async writeToCsv(data: Transaction[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      stringify(data, { header: true }, (err, output) => {
        if (err) {
          return reject(err);
        }
        fs.writeFile('src/data/data.csv', output, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }

  groupByTransactionId = (
    transactions: Transaction[],
  ): Record<string, string[]> => {
    return transactions.reduce((acc: Record<string, string[]>, transaction) => {
      const { TransactionId, Status } = transaction;
      if (!acc[TransactionId]) {
        acc[TransactionId] = [];
      }
      acc[TransactionId].push(Status);
      return acc;
    }, {});
  };

  async createTransaction(d: Transaction): Promise<string> {
    if (JSON.stringify(d.Amount).length - 1 > 18) {
      throw new BadRequestException('Amount should be less than 18 digits');
    }
    const oldData: Transaction[] = await this.readCsv();
    const data = [...oldData, d];
    await this.writeToCsv(data);
    return 'Transaction created successfully';
  }
  async getStatusById(id: string): Promise<string> {
    const data = await this.readCsv();
    const result = data.filter(
      (transaction) => transaction.TransactionId === id,
    );
    if (result.length) {
      return result[result.length - 1].Status;
    } else {
      throw new NotFoundException(`No transaction found with ID: ${id}`);
    }
  }

  async updateTransactionById(
    id: string,
    body: TransactionUpdateType,
  ): Promise<string> {
    try {
      if (!id || !body.oldStatus || !body.newStatus) {
        throw new BadRequestException('Missing required parameters');
      }

      let data: Transaction[];
      try {
        data = await this.readCsv();
      } catch (error: any) {
        throw new Error(`Failed to read CSV file: ${(error as Error).message}`);
      }

      const index = data.findIndex(
        (transaction) =>
          transaction.TransactionId === id &&
          transaction.Status === body.oldStatus,
      );

      if (index === -1) {
        throw new NotFoundException(
          `Transaction not found with ID: ${id} and status: ${body.oldStatus}`,
        );
      }

      const updatedTransaction: Transaction = {
        ...data[index],
        Status: body.newStatus,
      };
      data[index] = updatedTransaction;

      try {
        await this.writeToCsv(data);
      } catch (error) {
        throw new Error(
          `Failed to write CSV file: ${(error as Error).message}`,
        );
      }

      return `Transaction ${id} status updated from ${body.oldStatus} to ${body.newStatus}`;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new Error(
        `Failed to update transaction: ${(error as Error).message}`,
      );
    }
  }

  async getHistoryById(id: string): Promise<string> {
    const data = await this.readCsv();
    const result = data.filter(
      (transaction) => transaction.TransactionId === id,
    );
    console.log(result);
    if (result.length) {
      const history: string[] = result.map((transaction) => transaction.Status);

      return history.join(' --> ');
    } else {
      throw new NotFoundException(`No transaction found with ID: ${id}`);
    }
  }

  async getAllTransaction(): Promise<Transaction[]> {
    return await this.readCsv();
  }

  async getAllTransactionStatus(): Promise<Record<string, string[]>> {
    return this.groupByTransactionId(await this.readCsv());
  }

  getHello(): string {
    return 'Hello World!';
  }
}
