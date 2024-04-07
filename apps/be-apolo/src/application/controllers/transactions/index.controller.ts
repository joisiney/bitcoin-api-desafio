import { TransactionCreateUseCase } from '@/application/use-cases/transactions/create/index.use-case'
import { TransactionFindByCustomerUseCase } from '@/application/use-cases/transactions/find-customer/index.use-case'

import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Route } from '@olympus/be-router-angelo'
import { ITransactionCreateDto, transactionCreateDto } from './dto/create.dto'
import { ICustomerIdDto, customerIdDto } from './dto/customer.dto'

@Controller('/olympus')
@Injectable({
  dep: ['TransactionCreateUseCase', 'TransactionFindByCustomerUseCase'],
})
export class TransactionController {
  constructor(
    private createUseCase: TransactionCreateUseCase,
    private findByCustomerUseCase: TransactionFindByCustomerUseCase,
  ) {}

  @Route({ method: 'POST', url: '/transaction', dto: transactionCreateDto })
  async save(data: ITransactionCreateDto) {
    return this.createUseCase.execute({
      ...data,
      customerId: 'fpxqiasd2mc258ntkecu2h1c',
    })
  }

  @Route({
    method: 'GET',
    url: '/transaction/balance-by-customer/:customerId',
    dto: customerIdDto,
  })
  async balanceByCustomer({ customerId }: ICustomerIdDto) {
    return this.findByCustomerUseCase.execute(customerId)
  }
}
