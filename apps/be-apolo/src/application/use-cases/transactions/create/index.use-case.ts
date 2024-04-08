import { ITransactionRepository } from '@/infra/repositories/transaction/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { ICreateUseCase } from './index.dto'

@Injectable({ dep: ['TRANSACTION_REPOSITORY'] })
export class TransactionCreateUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository.Implements,
  ) {}

  async execute(props: ICreateUseCase) {
    const news = await this.transactionRepository.create({
      ...props,
      balanceInCents: 1,
    })
    if (news.isError) return news.launchError()
    return true
  }
}
