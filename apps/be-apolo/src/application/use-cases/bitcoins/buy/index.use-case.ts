import { IBitcoinRepository } from '@/infra/repositories/bitcoin/index.dto'
import { ITransactionRepository } from '@/infra/repositories/transaction/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { BadRequestException, IBitcoinGateway } from '@olympus/lib-hera'
import { IMailService } from '@olympus/lib-hera/src/application/services/mail/index.dto'
import { IBuyUseCase } from './index.dto'

@Injectable({
  dep: [
    'BITCOIN_REPOSITORY',
    'TRANSACTION_REPOSITORY',
    'BITCOIN_GATEWAY',
    'MAIL_SERVICE',
  ],
})
export class BitcoinBuyUseCase {
  constructor(
    public readonly bitcoinRepository: IBitcoinRepository.Implements,
    private readonly transactionRepository: ITransactionRepository.Implements,
    private readonly bitcoinGateway: IBitcoinGateway.Implements,
    private readonly mailService: IMailService.Implements,
  ) {}

  async execute(props: IBuyUseCase) {
    const balanceTotalInCents = await this.validateTransaction(props)
    const bitcoinResponse = await this.bitcoinGateway.quotation()
    if (bitcoinResponse.isError) {
      bitcoinResponse.launchError()
    }
    const btc = props.totalInCents / (bitcoinResponse.value.buy * 100)

    const balanceBtc = await this.getBalance({
      ...props,
      btc: btc,
    })

    // Data for buy
    const buyData = {
      customerId: props.customerId,
      type: props.type,
      totalInCents: props.totalInCents,
      btc: btc,
      balanceBtc: balanceBtc!,
    }

    const newBitcoinTransaction = await this.bitcoinRepository.buy(buyData)
    if (newBitcoinTransaction.isError)
      return newBitcoinTransaction.launchError()

    // Charge transaction value
    const newTransactionBitcoin = await this.transactionRepository.create({
      balanceInCents: balanceTotalInCents - props.totalInCents,
      type: 'charge',
      customerId: props.customerId,
      totalInCents: props.totalInCents,
    })
    if (newTransactionBitcoin.isError)
      return newTransactionBitcoin.launchError()

    // Notify transaction by email
    await this.mailService.send({
      from: 'onboarding@resend.dev',
      to: 'olympusbitcoin@gmail.com',
      subject: `Investimento de ${(props.totalInCents / 100).toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        },
      )} realizado`,
      template: 'NewInvestment',
      body: {
        deposit: props.totalInCents,
        btc,
      },
    })

    return true
  }

  private async validateTransaction(props: IBuyUseCase) {
    const lastBalance = await this.transactionRepository.balance(
      props.customerId,
    )

    if (lastBalance.isError) {
      lastBalance.launchError()
    }

    if (
      lastBalance.isSuccess &&
      lastBalance.value.balanceInCents < props.totalInCents
    ) {
      throw new BadRequestException(
        `Insufficient funds ${lastBalance.value.balanceInCents}`,
      )
    }

    return lastBalance.value.balanceInCents
  }

  private async getBalance(props: IBuyUseCase) {
    const lastBalance = await this.bitcoinRepository.balance(props.customerId)

    let balanceBtc
    if (lastBalance.isSuccess) {
      balanceBtc =
        props.type == 'income'
          ? Number(lastBalance.value.balanceBtc) + Number(props.btc)!
          : Number(lastBalance.value.balanceBtc) - Number(props.btc)!
    } else {
      balanceBtc = props.type == 'income' ? props.btc : props.btc! * -1
    }

    return balanceBtc
  }
}
