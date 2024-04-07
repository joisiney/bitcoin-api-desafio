import { db } from '@/infra/database/drizzle/connection'
import { Injectable } from '@olympus/be-di-ilitia'
import { ITransactionDto } from '@olympus/domain-ceos'
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
      type: props.type,
      totalInCents: props.totalInCents,
      balanceInCents: props.balanceInCents,
    })

    if (!transaction) {
      return new Left(new NotFoundException('Transaction not created'))
    }
    return new Right(true)
  }
}
