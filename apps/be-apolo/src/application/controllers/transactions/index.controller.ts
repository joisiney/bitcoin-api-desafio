import { TransactionCreateUseCase } from '@/application/use-cases/transactions/create/index.use-case'

import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Route } from '@olympus/be-router-angelo'
import { ITransactionCreateDto, transactionCreateDto } from './dto/create.dto'

@Controller('/olympus')
@Injectable({
  dep: ['TransactionCreateUseCase'],
})
export class TransactionController {
  constructor(private createUseCase: TransactionCreateUseCase) {}

  @Route({ method: 'POST', url: '/transaction', dto: transactionCreateDto })
  async save(data: ITransactionCreateDto) {
    return this.createUseCase.execute({
      ...data,
      customerId: 'fpxqiasd2mc258ntkecu2h1c',
    })
  }
}
