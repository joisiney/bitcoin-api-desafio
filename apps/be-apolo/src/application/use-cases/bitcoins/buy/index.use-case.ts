import { IBitcoinRepository } from '@/infra/repositories/bitcoin/index.dto'
import { ITransactionRepository } from '@/infra/repositories/transaction/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { BadRequestException, IBitcoinGateway } from '@olympus/lib-hera'
import { IBuyUseCase } from './index.dto'

@Injectable({
  dep: ['BITCOIN_REPOSITORY', 'TRANSACTION_REPOSITORY', 'BITCOIN_GATEWAY'],
})
export class BitcoinBuyUseCase {
  constructor(
    public readonly bitcoinRepository: IBitcoinRepository.Implements,
    private readonly transactionRepository: ITransactionRepository.Implements,
    private readonly bitcoinGateway: IBitcoinGateway.Implements,
  ) {}

  async execute(props: IBuyUseCase) {
    const balanceTotalInCents = await this.validateTransaction(props)
    const bitcoinResponse = await this.bitcoinGateway.quotation()
    if (bitcoinResponse.isError) {
      bitcoinResponse.launchError()
    }
    const btcInCents = props.totalInCents / (bitcoinResponse.value.buy * 100)

    const balanceBtcInCents = await this.getBalance({
      ...props,
      btcInCents: btcInCents,
    })

    // Data for buy
    const buyData = {
      customerId: props.customerId,
      type: props.type,
      totalInCents: props.totalInCents,
      btcInCents: btcInCents,
      balanceTotalInCents: balanceTotalInCents - props.totalInCents,
      balanceBtcInCents: balanceBtcInCents!,
    }

    const newBitcoinTransaction = await this.bitcoinRepository.buy(buyData)
    if (newBitcoinTransaction.isError)
      return newBitcoinTransaction.launchError()

    // Charge transaction value
    const newTransactionBitcoin = await this.transactionRepository.create({
      balanceInCents: buyData.balanceTotalInCents,
      type: 'charge',
      customerId: props.customerId,
      totalInCents: props.totalInCents,
    })
    if (newTransactionBitcoin.isError)
      return newTransactionBitcoin.launchError()

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

    let balanceBtcInCents
    if (lastBalance.isSuccess) {
      balanceBtcInCents =
        props.type == 'income'
          ? lastBalance.value.balanceBtcInCents + props.btcInCents!
          : lastBalance.value.balanceBtcInCents - props.btcInCents!
    } else {
      balanceBtcInCents =
        props.type == 'income' ? props.btcInCents : props.btcInCents! * -1
    }

    return balanceBtcInCents
  }
}
