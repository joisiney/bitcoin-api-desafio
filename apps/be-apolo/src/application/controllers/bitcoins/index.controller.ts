import { BitcoinQuotationUseCase } from '@/application/use-cases/bitcoins/quotation/index.use-case'
import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Guard, Route } from '@olympus/be-router-angelo'
import { authDto } from '../auth/dto/auth.dto'

@Controller('/olympus')
@Injectable({
  dep: ['BitcoinQuotationUseCase'],
})
export class BitcoinController {
  constructor(private quotationUseCase: BitcoinQuotationUseCase) {}

  @Guard({ dep: 'AuthGuardUseCase', dto: authDto, key: 'auth' })
  @Route({
    method: 'GET',
    url: '/bitcoin/quotation',
  })
  async quotation() {
    return this.quotationUseCase.execute()
  }
}
