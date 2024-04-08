import { ITransactionRepository } from '@/infra/repositories/transaction/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'

@Injectable({ dep: ['TRANSACTION_REPOSITORY'] })
export class TransactionFindByCustomerUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository.Implements,
  ) {}

  async execute(customerId: string) {
    const transaction = await this.transactionRepository.balance(customerId)
    if (transaction.isError) {
      return transaction.launchError()
    } else {
      return {
        balanceInCents: Number(transaction.value.balanceInCents),
      }
    }
  }
}
