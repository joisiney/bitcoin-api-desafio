import { ITransactionRepository } from '@/infra/repositories/transaction/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { IMailService } from '@olympus/lib-hera/src/application/services/mail/index.dto'
import { ICreateUseCase } from './index.dto'

@Injectable({ dep: ['TRANSACTION_REPOSITORY', 'MAIL_SERVICE'] })
export class TransactionCreateUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository.Implements,
    private readonly mailService: IMailService.Implements,
  ) {}

  async execute(props: ICreateUseCase) {
    const balanceInCents = await this.getBalance(props)
    const news = await this.transactionRepository.create({
      ...props,
      balanceInCents,
    })
    if (news.isError) return news.launchError()

    await this.mailService.send({
      from: 'onboarding@resend.dev',
      to: 'olympusbitcoin@gmail.com',
      subject: `Novo Depósito ${(props.totalInCents / 100).toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        },
      )}`,
      template: 'NewDeposit',
      body: {
        deposit: props.totalInCents,
      },
    })

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
