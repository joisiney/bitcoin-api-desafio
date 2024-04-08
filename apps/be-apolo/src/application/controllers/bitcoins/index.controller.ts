import { BitcoinBuyUseCase } from '@/application/use-cases/bitcoins/buy/index.use-case'
import { BitcoinQuotationUseCase } from '@/application/use-cases/bitcoins/quotation/index.use-case'
import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Guard, Route } from '@olympus/be-router-angelo'
import { authDto } from '../auth/dto/auth.dto'
import { IBitcoinBuyDto, bitcoinBuyDto } from './dto/buy.dto'

@Controller('/olympus')
@Injectable({
  dep: ['BitcoinQuotationUseCase', 'BitcoinBuyUseCase'],
})
export class BitcoinController {
  constructor(
    private quotationUseCase: BitcoinQuotationUseCase,
    private bitcoinBuyUseCase: BitcoinBuyUseCase,
  ) {}

  @Guard({ dep: 'AuthGuardUseCase', dto: authDto, key: 'auth' })
  @Route({
    method: 'GET',
    url: '/bitcoin/quotation',
  })
  async quotation() {
    return this.quotationUseCase.execute()
  }

  @Guard({ dep: 'AuthGuardUseCase', dto: authDto, key: 'auth' })
  @Route({ method: 'POST', url: '/bitcoin/buy', dto: bitcoinBuyDto })
  async buy(data: IBitcoinBuyDto) {
    return this.bitcoinBuyUseCase.execute({
      type: 'income',
      totalInCents: data.totalInCents,
      customerId: data.auth.id,
    })
  }
}
