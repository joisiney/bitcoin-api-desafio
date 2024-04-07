import { db } from '@/infra/database/drizzle/connection'
import { Injectable } from '@olympus/be-di-ilitia'
import { ITransactionDto, TransactionEntity } from '@olympus/domain-ceos'
import { Either, Left, NotFoundException, Right } from '@olympus/lib-hera'
import { transactions as transactionsEntity } from '../../database/drizzle/schema'
import { ITransactionRepository } from './index.dto'

@Injectable({ name: 'TRANSACTION_REPOSITORY' })
export class TransactionRepositoryTypeDrizzle
  implements ITransactionRepository.Implements
{
  async create(
    props: Omit<Omit<ITransactionDto, 'id'>, 'createdAt'>,
  ): Promise<Either<boolean, NotFoundException>> {
    const transaction = await db.insert(transactionsEntity).values({
      customerId: props.customerId,
      type: props.type == 'income' ? 'income' : 'charge',
      totalInCents: props.totalInCents,
      balanceInCents: props.balanceInCents,
    })

    if (!transaction) {
      return new Left(new NotFoundException('Transaction not created'))
    }
    return new Right(true)
  }

  async balance(
    customerId: string,
  ): Promise<Either<TransactionEntity, NotFoundException>> {
    const transaction = await db.query.transactions.findFirst({
      where(fields, { eq }) {
        return eq(fields.customerId, customerId)
      },
      orderBy(fields, { desc }) {
        return desc(fields.createdAt)
      },
    })

    if (!transaction) {
      return new Left(new NotFoundException('Transaction not found'))
    }

    const transactionMapper = new TransactionEntity(transaction)
    return new Right(transactionMapper)
  }
}
