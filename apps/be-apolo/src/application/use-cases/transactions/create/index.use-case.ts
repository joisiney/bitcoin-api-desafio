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
      balanceInCents: await this.getBalance(props),
    })
    if (news.isError) return news.launchError()
    return true
  }

  private async getBalance(props: ICreateUseCase) {
    const lastBalance = await this.transactionRepository.balance(
      props.customerId,
    )

    let balance
    if (lastBalance.isSuccess) {
      balance =
        props.type == 'income'
          ? lastBalance.value.balanceInCents + props.totalInCents
          : lastBalance.value.balanceInCents - props.totalInCents
    } else {
      balance =
        props.type == 'income' ? props.totalInCents : props.totalInCents * -1
    }

    return balance
  }
}
