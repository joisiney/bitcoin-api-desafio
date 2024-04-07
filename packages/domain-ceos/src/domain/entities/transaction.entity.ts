import { type IOptional } from '@olympus/lib-hera'
import { ITransactionDto } from '../dto/transaction.dto'

export class TransactionEntity {
  protected data: ITransactionDto
  constructor(_data: IOptional<ITransactionDto, 'id' | 'createdAt'>) {
    this.data = {
      ..._data,
      createdAt: _data.createdAt || new Date(),
    } as ITransactionDto
  }

  get id() {
    return this.data.id
  }

  get db() {
    return this.data
  }

  toJSON() {
    const { ...data } = this.data
    return data
  }
}
