import { TransactionCreateUseCase } from '@/application/use-cases/transactions/create/index.use-case'

import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Guard, Route } from '@olympus/be-router-angelo'
import { authDto } from '../auth/dto/auth.dto'
import { ITransactionCreateDto, transactionCreateDto } from './dto/create.dto'

@Controller('/olympus')
@Injectable({
  dep: ['TransactionCreateUseCase'],
})
export class TransactionController {
  constructor(private createUseCase: TransactionCreateUseCase) {}

  @Guard({ dep: 'AuthGuardUseCase', dto: authDto, key: 'auth' })
  @Route({ method: 'POST', url: '/transaction', dto: transactionCreateDto })
  async save(data: ITransactionCreateDto) {
    return this.createUseCase.execute({
      type: data.type,
      totalInCents: data.totalInCents,
      customerId: data.auth.id,
    })
  }
}
