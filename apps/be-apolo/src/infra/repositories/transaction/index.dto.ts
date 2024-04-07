import { ITransactionDto } from '@olympus/domain-ceos'
import { Either, NotFoundException } from '@olympus/lib-hera'

export namespace ITransactionRepository {
  export interface Implements {
    create(
      props: Omit<Omit<ITransactionDto, 'id'>, 'createdAt'>,
    ): Promise<Either<boolean, NotFoundException>>
  }
}
